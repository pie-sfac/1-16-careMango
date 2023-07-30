import React, { ChangeEvent } from 'react';

interface InputProps {
  type: string;
  value: string | number | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name: string;
  placeholder?: string | number;
  leftBtn?: React.ReactNode;
  rightBtn?: React.ReactNode;
  unit?: string;
  align?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  value,
  onChange,
  label,
  placeholder,
  leftBtn,
  rightBtn,
  unit,
  align,
}) => {
  const style = 'text-center';
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      {leftBtn}
      <input
        className={align}
        id={name}
        name={name}
        type={type}
        value={value === 0 ? '' : value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <span>{unit}</span>
      {rightBtn}
    </>
  );
};

export default Input;
