import React from 'react';
import * as httpStatusCodes from 'http-status-codes';
import redirect from '../src/app/shared/utils/redirect';

class Error extends React.Component<any, any> {
  static getInitialProps(ctx: any) {
    const { res, err } = ctx;
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    if (httpStatusCodes.NOT_FOUND === statusCode) {
      redirect('/', ctx);
    }

    return { statusCode, namespacesRequired: [] };
  }

  render() {
    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    );
  }
}

export default Error;
