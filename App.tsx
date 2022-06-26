import React, { FC } from 'react';

import style from './App.module.scss';
import { Form } from 'components/Form';

export const App: FC = () => {
  return (
      <div className={style.container}>
        <Form/>
      </div>
  );
};

export default App;