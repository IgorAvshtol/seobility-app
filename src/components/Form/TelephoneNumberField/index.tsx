import React, { ChangeEvent, useEffect, useState } from 'react';

import style from '../Form.module.scss';
import { TypeLoadingStatus } from '../../interfaces';

interface ITelephoneNumberField {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error: string;
  loading: TypeLoadingStatus;
}

export const TelephoneNumberField = ({ onChange, value, error, loading }: ITelephoneNumberField) => {

  const [phoneFieldValue, setPhoneFieldValue] = useState<string>(value);

  useEffect(() => {
    if (loading === TypeLoadingStatus.IS_RESOLVE)
      setPhoneFieldValue('');
  }, [loading]);

  const prefixNumber = (str: string) => {
    if (str === '7') {
      return '7 (';
    }
    if (str === '8') {
      return '8 (';
    }
    if (str === '9') {
      return '7 (9';
    }
    return '7 (';
  };

  const onChangeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    const value = e.currentTarget.value.replace(/\D+/g, '');
    const numberLength = 11;

    let result;
    if (e.currentTarget.value.includes('+8') || e.currentTarget.value[0] === '8') {
      result = '';
    } else {
      result = '+';
    }

    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 0:
          result += prefixNumber(value[i]);
          continue;
        case 4:
          result += ') ';
          break;
        case 7:
          result += '-';
          break;
        case 9:
          result += '-';
          break;
        default:
          break;
      }
      result += value[i];
    }
    e.currentTarget.value = result;
    setPhoneFieldValue(result);
  };

  return (
      <>
        <input name='phone' value={phoneFieldValue} onChange={onChangeInputValueHandler} type={'tel'}
               placeholder='+7(___) ___-__-__'/>
        {error && <p className={style.error}>{error}</p>}
      </>
  );
};
