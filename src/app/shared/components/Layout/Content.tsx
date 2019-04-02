import { Layout } from 'antd';
import React, { Component } from 'react';
import './css/Content.scss';

class Content extends Component {
  render() {
    const children = this.props.children;
    return (
      <div className="layout-content">
        <div className="content">{children}</div>
      </div>
    );
  }
}

export default Content;
