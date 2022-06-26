import { ChangeEvent, FormEvent, useState } from 'react';

import { nameValidateService } from 'services/nameValidateService';
import { IUser } from 'components/interfaces';
import { messageValidateService } from 'services/messageValidateService';

type IFormFields = 'name' | 'phone' | 'email' | 'password' | 'date' | 'message'
const fieldsFrom = ['name', 'phone', 'email', 'password', 'date', 'message'];

interface ErrorRecord {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  date?: string;
  message?: string;
}

export const useForm = () => {

  const [values, setValues] = useState<IUser>({} as IUser);
  const [errors, setErrors] = useState<ErrorRecord>({});

  const validate = (name: IFormFields, value: string) => {
    switch (name) {
      case 'name':
        if (!value || !nameValidateService(value)) {
          setErrors((prev) => {
                return {
                  ...prev,
                  name: 'This field must contain the First Name and Last Name and consist of only two words, at least 3 characters long and no more than 30.',
                };
              }
          );
        } else {

          setErrors((prev) => {
            const { name, ...other } = prev;
            return other;
          });
        }
        return;
      case 'email':
        if (!value || !new RegExp('^[A-Z\\d._%+-]+@[A-Z\\d-]+.+.[A-Z]{2,4}$', 'i').test(value)) {
          setErrors((prev) => {
            return {
              ...prev,
              email: 'Incorrect email!'
            };
          });
        } else {
          setErrors((prev) => {
            const { email, ...other } = prev;
            return other;
          });
        }
        return;
      case 'password':
        if (!value || value.length < 6) {
          setErrors((prev) => {
            return {
              ...prev,
              password: 'The password needs to be at least 6 characters long.'
            };
          });
        } else {
          setErrors((prev) => {
            const { password, ...other } = prev;
            return other;
          });
        }
        return;
      case 'phone':
        if (!value || value.length < 18) {
          setErrors((prev) => {
            return {
              ...prev,
              phone: 'Phone number must be 11 digits.'
            };
          });
        } else {
          setErrors((prev) => {
            const { phone, ...other } = prev;
            return other;
          });
        }
        return;
      case 'message':
        if (!value || !messageValidateService(value)) {
          setErrors((prev) => {
            return {
              ...prev,
              message: 'Comment must be at least 6 characters and not more than 300.'
            };
          });
        } else {
          setErrors((prev) => {
            const { message, ...other } = prev;
            return other;
          });
        }
        return;
      default:
        return;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>) => {
    e.persist();

    const name = e.target.name as IFormFields;
    const val = name === 'name' ? e.target.value.toUpperCase() : e.target.value;

    validate(name, val);

    setValues({
      ...values,
      [name]: val,
    });

  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (let i = 0; i < fieldsFrom.length; i++) {
      const key = fieldsFrom[i] as IFormFields;
      validate(key, values[key]);
    }
  };

  return {
    values,
    setValues,
    handleSubmit,
    handleChange,
    errors,
  };
};
