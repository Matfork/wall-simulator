import React from 'react';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import App, { Container } from 'next/app';
import configureStore from '../src/app/shared/redux/store';
import { Provider } from 'react-redux';
import { appWithTranslation } from './../src/i18n';
import { _C } from '../src/app/shared/utils/constants';

class RootApp extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store }: any = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(
  appWithTranslation(withReduxSaga(RootApp))
);
