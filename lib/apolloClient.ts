import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  type NormalizedCacheObject,
} from '@apollo/client';

let browserApolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const isServer = typeof window === 'undefined';

function getApolloUri() {
  if (isServer && process.env.SERVER_API_URL) {
    return process.env.SERVER_API_URL;
  }

  return process.env.NEXT_PUBLIC_API_URL;
}

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: isServer,
    link: new HttpLink({
      uri: getApolloUri(),
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState?: NormalizedCacheObject) {
  if (!browserApolloClient && !isServer) {
    browserApolloClient = createApolloClient();
  }

  const apolloClient = isServer
    ? createApolloClient()
    : (browserApolloClient as ApolloClient<NormalizedCacheObject>);

  if (initialState) {
    apolloClient.cache.restore(initialState);
  }

  return apolloClient;
}

export const client = initializeApollo();
