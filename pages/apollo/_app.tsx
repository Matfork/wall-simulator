import App, { Container } from 'next/app';
import React from 'react';
import withApollo from '../../src/app/shared/hoc/withApollo';

class MyApp extends App {
  render() {
    const { Component, pageProps }: any = this.props;
    console.log('--->', this.props, Component, pageProps);
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withApollo(MyApp);
