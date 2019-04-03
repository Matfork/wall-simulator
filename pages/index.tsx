import React from 'react';
import { AuthService } from '../src/app/shared/services/auth.service';
import { redirectAs } from '../src/app/shared/utils/redirect';
import { _C } from '../src/app/shared/utils/constants';

class Index extends React.Component {
  static async getInitialProps(ctx: any) {
    if (!AuthService.isAuth(ctx)) {
      redirectAs(
        //  { url: '/auth/login', as: '/login/server?title=theBest' },
        { url: '/auth/login', as: '/login' },
        ctx
      );
    } else {
      redirectAs({ url: '/wall/main', as: '/wall' }, ctx);
    }

    return {
      namespacesRequired: []
    };
  }

  render() {
    return null;
  }
}

export default Index;
