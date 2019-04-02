import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { _C } from './app/shared/utils/constants';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';

interface Options {
  getToken: () => string;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (_C.IS_BROWSER) {
  (global as any).fetch = fetch;
}

const create = (initialState: any, { getToken }: Options) => {
  //   const httpLink = createHttpLink({
  //     uri:  'http://localhost:4000/graphql',
  //     credentials: 'include'
  //   });

  const httpLink = createHttpLink({
    uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn', // Server URL (must be absolute)
    credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        cookie: token ? `qid=${token}` : ''
      }
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: _C.IS_BROWSER,
    ssrMode: !_C.IS_BROWSER, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  });
};

export const initApollo = (initialState: any, options: Options) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!_C.IS_BROWSER) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
};
