import React, { Component } from 'react';
import Header from './Header';
import Content from './Content';
import './css/Layout.scss';

class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <Header />
        <Content>{this.props.children}</Content>
      </div>
    );
  }
}

export default Layout;
