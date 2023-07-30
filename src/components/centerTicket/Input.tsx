import React, { ChangeEvent } from 'react';

interface InputProps {
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ name, type, value, onChange, label }) => (
  <>
    {label && <label htmlFor={name}>{label}</label>}
    <input id={name} type={type} value={value} onChange={onChange} />
  </>
);

export default Input;
