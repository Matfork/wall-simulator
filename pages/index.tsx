import React from 'react';
import { connect } from 'react-redux';


import Page from '../src/app/modules/components/saga/Page';
import { tickClock, loadData, startClock } from '../src/app/shared/redux/actions/test.action';

class Index extends React.Component {
  static async getInitialProps(props: any) {
    const { store, isServer } = props.ctx;
    store.dispatch(tickClock(isServer));

    if (!store.getState().placeholderData) {
      store.dispatch(loadData());
    }

    return { isServer };
  }

  componentDidMount() {
    (this.props as any).dispatch(startClock());
  }

  render() {
    return <Page title="Index Page" linkTo="/other" NavigateTo="Other Page" />;
  }
}

export default connect()(Index);
