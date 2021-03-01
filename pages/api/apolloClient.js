import { ApolloClient, InMemoryCache } from '@apollo/client';

let apolloClient;

function createApolloCLient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://crashcourse-backend.herokuapp.com/graphql',
  });
}

function initializeApollo() {
  apolloClient = apolloClient ?? createApolloCLient();
  return apolloClient;
}

export function useApollo() {
  return initializeApollo();
}
