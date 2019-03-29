/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class PageCount extends Component {
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
          PageCount: <span>{count}</span>
        </h1>
      </div>
    );
  }
}

const mapStateToProps = ({ count }: any) => ({ count });
export default connect(mapStateToProps)(PageCount);
