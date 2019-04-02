import cookie from 'cookie';
import React from 'react';
import Head from 'next/head';
import ApolloClient from 'apollo-client';
import { initApollo } from '../../../apollo.config';
import { _C } from '../utils/constants';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

const parseCookies = (req?: any, options = {}) => {
  return cookie.parse(
    req ? req.headers.cookie || '' : document.cookie,
    options
  );
};

export default (App: any) => {
  return class WithApollo extends React.Component {
    apollo: ApolloClient<NormalizedCacheObject>;

    static displayName = `WithApollo(${App.displayName ||
      App.name ||
      'Unknown'})`;

    static async getInitialProps(ctx: any) {
      const {
        Component,
        router,
        ctx: { req, res }
      } = ctx;

      // Initial serverState with apollo (empty)
      let serverState = {
        apollo: {
          data: {}
        }
      };

      const apollo = initApollo(
        {},
        {
          getToken: () => parseCookies(req).qid
        }
      );

      ctx.ctx.apolloClient = apollo;

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (App.getInitialProps) {
        composedInitialProps = await App.getInitialProps(ctx);
      }

      // When redirecting, the response is finished.
      // No point in continuing to render
      if (res && res.finished) {
        return {};
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!_C.IS_BROWSER) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <App
                {...composedInitialProps}
                Component={Component}
                router={router}
              />
            </ApolloProvider>
            // {
            //   router: {
            //     asPath: ctx.asPath,
            //     pathname: ctx.pathname,
            //     query: ctx.query
            //   }
            // }
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();

        // Extract query data from the store
        const state = {};

        // Extract query data from the Apollo store
        serverState = Object.assign(state, {
          apollo: { data: apollo.cache.extract() }
        });
      }

      return {
        serverState,
        ...composedInitialProps
      };
    }

    constructor(props: any) {
      super(props);
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apollo = initApollo(props.serverState.apollo.data, {
        getToken: () => parseCookies().token
      });
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <App {...this.props} />
        </ApolloProvider>
      );
    }
  };
};
