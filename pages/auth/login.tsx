import React, { Component } from 'react';
import redirect, { redirectAs } from '../../src/app/shared/utils/redirect';
import Head from '../../src/app/shared/components/NextHead/Head';
import LoginFormComponent from '../../src/app/modules/components/auth/login.form';
import { loginSchema } from '../../src/app/shared/utils/validation/auth/login.validation';
import { WithNamespaces } from 'react-i18next';
import { FirebaseService } from '../../src/app/shared/services/firebase.service';
import { AuthService } from '../../src/app/shared/services/auth.service';
import { _C } from '../../src/app/shared/utils/constants';
import { Formik } from 'formik';
import './css/Login.scss';

const schema = loginSchema.schema;

interface FormValues {
  email: string;
  password: string;
}

interface LoginState {
  apiError: null | string;
}

class Login extends Component<WithNamespaces> {
  static async getInitialProps(ctx: any) {
    // console.log(
    //   'Login page',
    //   _C.IS_BROWSER ? 'from client' : 'from server',
    //   ctx.query
    // );

    if (AuthService.isAuth(ctx)) {
      redirect('/', ctx);
    }

    return {
      namespacesRequired: ['login']
    };
  }

  componentDidMount() {
    FirebaseService.initialize();
  }

  state = {
    apiError: null
  } as LoginState;

  render() {
    return (
      <div className="login-page">
        <style global jsx>{`
          body {
            background: #3b5998;
          }
        `}</style>

        <Head title="Login" />

        <div className="auth-login">
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{ email: '', password: '' } as FormValues}
            validationSchema={schema}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(true);
              this.setState({
                apiError: null
              });
              try {
                await AuthService.login({
                  email: values.email,
                  password: values.password
                });

                actions.setSubmitting(false);
                return redirectAs({ url: '/wall/main', as: '/wall' });
              } catch ($e) {
                this.setState({
                  apiError: $e.message
                });
                actions.setSubmitting(false);
              }
            }}
            render={({ handleSubmit, isSubmitting }) => {
              return (
                <LoginFormComponent
                  handleSubmit={handleSubmit}
                  apiError={this.state.apiError}
                  isSubmitting={isSubmitting}
                />
              );
            }}
          />
        </div>
      </div>
    );
  }
}

export default Login;
