import React, { FC, FormEvent, useEffect } from 'react';

import style from './Form.module.scss';
import { useForm } from 'hooks/useForm';
import { usePostData } from 'hooks/usePostData';
import { IResponseData, TypeLoadingStatus } from '../interfaces';
import { TelephoneNumberField } from './TelephoneNumberField';

export const Form: FC = () => {
  const {
    data,
    errorResponse,
    loading,
    getResponseData
  } = usePostData<IResponseData>(process.env.REACT_APP_BASE_URL as string);
  const { values, setValues, handleSubmit, errors, handleChange } = useForm();

  const onSubmitButtonHandler = async (e: FormEvent<HTMLFormElement>) => {
    await handleSubmit(e);
    await getResponseData(values);
  };

  useEffect(() => {
    if (loading === TypeLoadingStatus.IS_RESOLVE) setValues({
      name: '',
      password: '',
      date: '',
      message: '',
      email: '',
      phone: ''
    });
  }, [loading]);

  return (
      <form className={style.registrationWrapper} onSubmit={onSubmitButtonHandler}>
        <h1 className={style.title}>Sign Up</h1>
        <input
            placeholder='Name*'
            name='name'
            value={values.name}
            onChange={handleChange}
            required
        />
        {errors.name && <p className={style.error}>{errors.name}</p>}
        <input
            placeholder='Email*'
            name='email'
            value={values.email}
            onChange={handleChange}
            required
        />
        {errors.email && <p className={style.error}>{errors.email}</p>}
        <input
            placeholder='Password*'
            type='password'
            value={values.password}
            name='password'
            onChange={handleChange}
        />
        {errors.password && <p className={style.error}>{errors.password}</p>}
        <TelephoneNumberField loading={loading} onChange={handleChange} value={values.phone} error={errors.phone}/>
        <div className={style.dateBlock}>
          <p>Your birthday:</p>
          <input
              type='date'
              name='date'
              value={values.date}
              onChange={handleChange}
              required
          />
        </div>

        {errors.date && <p className={style.error}>{errors.date}</p>}
        <textarea
            placeholder='Message'
            name='message'
            value={values.message}
            onChange={handleChange}
        />
        {errors.comment && <p className={style.error}>{errors.comment}</p>}
        {loading === TypeLoadingStatus.IS_PENDING && <p className={style.loading}>Loading....</p>}
        {loading !== TypeLoadingStatus.IS_PENDING &&
            <button type='submit' className={style.buttonSubmit}>
              Submit
            </button>}
        {errorResponse && <p className={style.errorResponse}>Not found</p>}
        {data &&
            <ul>
              <li>{data.name}</li>
              <li>{data.email}</li>
              <li>{data.phone}</li>
              <li>{data.date}</li>
              <li>{data.message}</li>
            </ul>
        }
      </form>
  );
};