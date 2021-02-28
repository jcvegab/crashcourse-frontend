import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from '@apollo/client';

let apolloClient;

function createApolloCLient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:8000/graphql',
    }),
    cache: new InMemoryCache(),
  });
}

function initializeApollo() {
  apolloClient = apolloClient ?? createApolloCLient();
  return apolloClient;
}

export function useApollo() {
  return initializeApollo();
}
