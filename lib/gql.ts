import { cookies } from 'next/headers';

type GqlFetchOptions = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

export async function gql<TData, TVariables = Record<string, unknown>>(
  query: string,
  variables?: TVariables,
  options?: GqlFetchOptions,
): Promise<TData> {
  const apiUrl = process.env.SERVER_API_URL;

  if (!apiUrl) {
    throw new Error('SERVER_API_URL is not defined');
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  const requestOptions: RequestInit & { next?: GqlFetchOptions['next'] } = {
    ...options,
    method: 'POST',
    headers: {
      ...options?.headers,
      'Content-Type': 'application/json',
      // biome-ignore lint/style/noNonNullAssertion: Internal token is required for Cloudflare WAF bypass
      'X-Internal-Token': process.env.INTERNAL_TOKEN!,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ query, variables }),
  };

  const startedAt = Date.now();
  let res: Response | undefined;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      res = await fetch(apiUrl, requestOptions);
      if (![502, 503, 504].includes(res.status) || attempt === 1) break;
    } catch {
      if (attempt === 1) {
        console.error('GraphQL request failed after retry', {
          durationMs: Date.now() - startedAt,
        });
        throw new Error('The courses service is temporarily unavailable.');
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  if (!res?.ok) {
    console.error('GraphQL request returned an unsuccessful response', {
      status: res?.status,
      durationMs: Date.now() - startedAt,
    });
    throw new Error('The courses service is temporarily unavailable.');
  }

  const { data, errors } = await res.json();

  if (errors?.length) {
    throw new Error(errors[0].message);
  }

  return data as TData;
}
