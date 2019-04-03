import React from 'react';
import { _C } from '../src/app/shared/utils/constants';
import Link from 'next/link';
import { redirectAs } from '../src/app/shared/utils/redirect';
import '../styles.scss';

class About extends React.Component {
  static async getInitialProps(ctx: any) {
    return {
      namespacesRequired: []
    };
  }

  render() {
    return (
      <div className="about-component">
        <h1>About</h1>
        <p>This is a wall experience which simulates facebook posts </p>

        <div>
          <Link
            href={{
              pathname: '/auth/login',
              query: { id: 'client', title: 'fromAbout' }
            }}
            as={'/login/client?title=fromAbout'}
          >
            <a>Login</a>
          </Link>
        </div>

        <div>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              redirectAs({
                url: '/auth/login?id=client&title=fromAbout',
                as: '/login/client?title=fromAbout'
              });
            }}
          >
            Login with Redirect
          </a>
        </div>
      </div>
    );
  }
}

export default About;
