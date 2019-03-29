import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  increment,
  decrement,
  reset
} from '../../../shared/redux/actions/test.action';

class Counter extends Component<{ dispatch: any }> {
  increment = () => {
    this.props.dispatch(increment());
  };

  decrement = () => {
    this.props.dispatch(decrement());
  };

  reset = () => {
    this.props.dispatch(reset());
  };

  render() {
    const { count }: any = this.props;
    return (
      <div>
        <style jsx>{`
          div {
            padding: 0 0 20px 0;
          }
        `}</style>
        <h1>
          Count: <span>{count}</span>
        </h1>
        <button onClick={this.increment}>+1</button>
        <button onClick={this.decrement}>-1</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    count: state.test.count
  };
};

export default connect(mapStateToProps)(Counter);
