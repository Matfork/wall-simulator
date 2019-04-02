import i18n from 'i18next';
import yup from '../yup';

export const loginSchema: any = {
  schema: () =>
    yup.object().shape({
      email: yup
        .string()
        .required()
        .email(),
      password: yup
        .string()
        .required()
        .min(8)
    })
};
