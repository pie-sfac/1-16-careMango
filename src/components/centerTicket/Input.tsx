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
  width?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  value,
  onChange,
  label,
  placeholder,
  leftBtn,
  rightBtn,
  unit,
  align = 'text-left',
  width = 'w-30',
  required,
}) => {
  const style = 'text-center';
  return (
    <>
      {label && (
        <label htmlFor={name} className="block my-5">
          {label}
          {required && <span className="text-primary-300">*</span>}
        </label>
      )}
      {leftBtn}
      <input
        className={`${align} ${width} input-select mr-1`}
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
