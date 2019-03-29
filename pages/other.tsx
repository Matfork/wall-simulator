import React from 'react';
import { connect } from 'react-redux';
import {
  tickClock,
  startClock
} from '../src/app/shared/redux/actions/test.action';
import Page from '../src/app/modules/components/saga/Page';

class Other extends React.Component {
  static async getInitialProps(props: any) {
    const { store, isServer } = props.ctx;
    store.dispatch(tickClock(isServer));
    return { isServer };
  }

  componentDidMount() {
    (this.props as any).dispatch(startClock());
  }

  render() {
    return <Page title="Other Page" linkTo="/" NavigateTo="Index Page" />;
  }
}

export default connect()(Other);
