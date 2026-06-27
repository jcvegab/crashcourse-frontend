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

  const res = await fetch(apiUrl, {
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
  });

  if (!res.ok) {
    throw new Error(`GQL fetch failed: ${res.status}`);
  }

  const { data, errors } = await res.json();

  if (errors?.length) {
    throw new Error(errors[0].message);
  }

  return data as TData;
}
