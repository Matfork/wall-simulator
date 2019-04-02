import React from 'react';

import { Field } from 'formik';
import { Row, Button, Icon, Alert, Spin } from 'antd';
import { RTextField } from '../../../shared/utils/formik/RenderInputs';
import { WithNamespaces, withNamespaces } from 'react-i18next';

import './css/LoginForm.scss';

interface LoginFormProps {
  handleSubmit: () => void;
  apiError: string | null;
  isSubmitting: boolean;
}

const LoginFormComponent: React.SFC<
  LoginFormProps & WithNamespaces
> = props => {
  const { handleSubmit, apiError, isSubmitting, t } = props;
  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      autoComplete="off"
      className="login-form"
    >
      <Row>
        {apiError && (
          <Alert
            className="alert-error"
            message="Error"
            description={apiError}
            type="error"
            closable={true}
          />
        )}
      </Row>
      <Row className="section-title">
        <h2>{t('main-title')}</h2>
      </Row>
      <Row>
        <Field
          type="text"
          name="email"
          // label={t('login.fields.email')}
          placeholder="Email"
          style={{ margin: '0 auto', display: 'block' }}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          component={RTextField}
        />
      </Row>

      <Row>
        <Field
          type="password"
          name="password"
          // label={t('login.fields.password')}
          placeholder="Password"
          style={{ margin: '0 auto', display: 'block' }}
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          component={RTextField}
        />
      </Row>

      <Row className="section-login-button">
        <Button
          type="primary"
          htmlType="submit"
          disabled={isSubmitting}
          className="login-button"
        >
          {t('login')} {!!isSubmitting ? <Spin size="small" /> : null}
        </Button>
      </Row>
    </form>
  );
};

export default withNamespaces('login')(LoginFormComponent);
