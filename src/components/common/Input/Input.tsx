import React, { ChangeEvent } from 'react';

interface InputProps {
  type: string;
  value: string | number | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name: string;
  placeholder?: string;
  leftBtn?: React.ReactNode;
  rightBtn?: React.ReactNode;
  unit?: string;
  align?: string;
  width?: string;
  required?: boolean;
  unitSelect?: React.ReactNode;
  maxLength?: number;
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
  unitSelect,
  maxLength,
}) => {
  const unitPosition = align === 'text-left' ? 'left-72' : 'left-52';
  return (
    <>
      {label && (
        <label htmlFor={name} className="block mt-10 mb-2">
          {label}
          {required && <span className="text-primary-300">*</span>}
        </label>
      )}
      {required ? (
        <div className="relative flex items-center justify-start">
          {leftBtn}
          <input
            className={`${align} ${width} input-select mr-1`}
            id={name}
            name={name}
            type={type}
            value={value === 0 ? '' : value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
          />
          <span className={`absolute ${unitPosition} text-text-700`}>{unit}</span>
          {rightBtn}
          {unitSelect}
        </div>
      ) : (
        <div className="relative flex items-center justify-start">
          {leftBtn}
          <input
            className={`${align} ${width} input-select mr-1 bg-gray-200 border-gray-300 cursor-not-allowed`}
            id={name}
            name={name}
            type={type}
            value={value === 0 ? '' : value}
            readOnly
          />
          <span className={`absolute ${unitPosition} text-text-700`}>{unit}</span>
          {rightBtn}
          {unitSelect}
        </div>
      )}
    </>
  );
};

export default Input;
