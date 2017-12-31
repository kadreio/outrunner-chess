import * as React from 'react';
import * as style from './style.css';

type Props = {
  name?: string,
  type?: string,
  error?: string;
  label: string,
  onChange(value): void
}

export const InputGroup = ({name, type='text', label, onChange, error}: Props) => {

  const valid = Boolean(error);

  return  <div className={style.normal}>
            <label>
              {label}
              <input name={name} type={type} onChange={(event) => onChange(event.target.type === 'checkbox' ? event.target.checked : event.target.value)} />
              <div>{error}</div>
            </label>
          </div>;
};
