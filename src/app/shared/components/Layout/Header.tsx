import { Button } from 'antd';
import React, { Component } from 'react';
import redirect from '../../utils/redirect';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import './css/Header.scss';

class Header extends Component {
  state = { user: null } as any;
  res: any = null;

  handleLogout = async () => {
    AuthService.logout();
    setTimeout(() => {
      redirect('/');
    }, 800);
  };

  handleLoggedUser = (user: any) => {
    user ? this.setState({ user }) : null;
  };

  componentDidMount() {
    FirebaseService.initialize();
    this.res = AuthService.userDataListener(this.handleLoggedUser);
  }

  componentWillUnmount() {
    this.res ? this.res() : null;
  }

  render() {
    const { user } = this.state;

    return (
      <div className="layout-header">
        <div className="options">
          {user && <span className="user">User: {user.email}</span>}
          <Button type="ghost" onClick={() => this.handleLogout()}>
            Logout
          </Button>
        </div>
      </div>
    );
  }
}

export default Header;
