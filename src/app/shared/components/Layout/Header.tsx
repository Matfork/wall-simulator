import { Button } from 'antd';
import React, { Component } from 'react';
import redirect from '../../utils/redirect';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import './css/Header.scss';

class Header extends Component {
  handleLogout = async () => {
    AuthService.logout();
    setTimeout(() => {
      redirect('/');
    }, 1000);
  };

  componentDidMount() {
    FirebaseService.initialize();
  }

  render() {
    return (
      <div className="layout-header">
        <div className="options">
          <Button type="ghost" onClick={() => this.handleLogout()}>
            Logout
          </Button>
        </div>
      </div>
    );
  }
}

export default Header;
