import React, { ChangeEvent } from 'react';

interface InputProps {
  value: string | number | undefined;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  name?: string;
  placeholder?: string;
  width?: string;
  height?: string;
  required?: boolean;
}

const GetInputMemo: React.FC<InputProps> = ({ name, value, onChange, label, placeholder, width, height }) => {
  return (
    <>
      {label && (
        <label htmlFor={name} className="block mt-10 mb-2">
          {label}
        </label>
      )}
      <div className="relative flex items-center justify-start">
        <textarea
          className={`${width} ${height} input-select mr-1`}
          id={name}
          name={name}
          value={value === 0 ? '' : value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default GetInputMemo;
