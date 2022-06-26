import { ChangeEvent, FormEvent, useState } from 'react';

import { nameValidateService } from 'services/nameValidateService';
import { IUser } from 'components/interfaces';
import { messageValidateService } from 'services/messageValidateService';

type IFormFields = 'name' | 'phone' | 'email' | 'password' | 'date' | 'comment'

interface ErrorRecord {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  date?: string;
  comment?: string;
}

export const useForm = () => {

  const [values, setValues] = useState<IUser>({} as IUser);
  const [errors, setErrors] = useState<ErrorRecord>({});

  const validate = (event: ChangeEvent<HTMLInputElement>, name: IFormFields, value: string) => {

    switch (name) {
      case 'name':
        if (!nameValidateService(value)) {
          setErrors({
            ...errors,
            name: 'This field must contain the First Name and Last Name and consist of only two words, at least 3 characters long and no more than 30.',

          });
        } else {
          const { name, ...other } = errors;
          setErrors(other);
        }
        break;
      case 'email':
        if (!new RegExp('^[A-Z\\d._%+-]+@[A-Z\\d-]+.+.[A-Z]{2,4}$', 'i').test(value)) {
          setErrors({
            ...errors,
            email: 'Incorrect email!'
          });
        } else {
          const { email, ...other } = errors;
          setErrors(other);
        }
        break;
      case 'password':
        if (value.length < 6) {
          setErrors({
            ...errors,
            password: 'The password needs to be at least 6 characters long.'
          });
        } else {
          const { password, ...other } = errors;
          setErrors(other);
        }
        break;
      case 'phone':
        if (value.length !== 19) {
          setErrors({
            ...errors,
            phone: 'Phone number must be 11 digits.'
          });
        } else {
          const { phone, ...other } = errors;
          setErrors(other);
        }
        break;
      case 'comment':
        if (!messageValidateService(value)) {
          setErrors({
            ...errors,
            comment: 'Comment must be at least 6 characters and not more than 300.'
          });
        } else {
          const { comment, ...other } = errors;
          setErrors(other);
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>) => {
    e.persist();

    const name = e.target.name as IFormFields;
    const val = name === 'name' ? e.target.value.toUpperCase() : e.target.value;

    validate(e, name, val);

    setValues({
      ...values,
      [name]: val,
    });

  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return {
    values,
    setValues,
    handleSubmit,
    handleChange,
    errors,
  };
};
