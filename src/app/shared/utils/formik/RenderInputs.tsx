import React from 'react';
import _ from 'lodash';
import { Input, Form } from 'antd';
import { FieldProps } from 'formik';

const FormItem = Form.Item;

export const RTextField: React.SFC<
  FieldProps<any> & {
    prefix: React.ReactNode;
    label?: string;
  }
> = props => {
  const { field, form, label, ...others } = props;
  const errors = form.errors[field.name];
  const touched = form.touched[field.name];
  
  return (
    <FormItem
      label={label}
      help={errors && touched ? errors : false}
      validateStatus={errors && touched ? 'error' : undefined}
    >
      <Input {...field} {...others} />
    </FormItem>
  );
};
