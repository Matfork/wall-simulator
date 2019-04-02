import React from 'react';
import { WithNamespaces } from 'react-i18next';
import { AuthService } from '../src/app/shared/services/auth.service';
import redirect from '../src/app/shared/utils/redirect';
import { _C } from '../src/app/shared/utils/constants';

class Index extends React.Component<WithNamespaces> {
  static async getInitialProps(ctx: any) {
    if (!AuthService.isAuth(ctx)) {
      redirect('/auth/login', ctx);
    } else {
      redirect('/wall/main', ctx);
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
