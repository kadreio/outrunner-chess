import * as style from './style.css';
import * as React from 'react';
import { InputGroup } from '../InputGroup';

type Props = {
  onSubmit(event): void;
  onChange(event): void;
  error?: any;
}



export const EmailLogin = ({ onSubmit, onChange, error }: Props) => {
  function handleSubmit(event) {
    //Don't do a standard form navigation
    event.preventDefault();
    onSubmit(event);
  }

  let emailError = '';
  let passwordError = '';
  let globalError = '';
  if(error) {
    switch(error.code) {
      case 'auth/invalid-email':
        emailError = 'Invalid email';
        break;
      case 'auth/weak-password':
        emailError = error.message;
        break;
      case 'auth/wrong-password':
        passwordError = 'Wrong password';
        break;
      case 'auth/email-already-in-use':
        globalError = error.message;
        break;
    }
  }

  return  <form className={style.normal} onSubmit={handleSubmit}>
      <h1> Sign In </h1>
      <InputGroup
        name='email'
        label='Email'
        type='email'
        error={emailError}
        onChange={(value) => onChange({email: value})}/>
      <InputGroup
        name='password'
        label='Password'
        type='password'
        error={passwordError}
        onChange={(value) => onChange({password: value})}/>
      <InputGroup
        name='signup'
        label='New Account'
        type='checkbox'
        onChange={(value) => {onChange({new: value})}}/>
      <input type="submit" value="Submit" />
      <div> {globalError} </div>
  </form>;
};

