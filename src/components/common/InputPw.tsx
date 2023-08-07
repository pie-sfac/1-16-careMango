import React, { useState } from 'react';

interface InputPwProps {
  title: string;
  onChange: (value: string) => void;
}

const InputPw = ({ title, onChange }: InputPwProps) => {
  const [state, setState] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <label htmlFor="inputPw" className="my-5">
      <p className="small-title">
        {title}
        <span className="text-primary-300">*</span>
      </p>
      <input
        id="inputPw"
        className="input-select"
        type="password"
        name="password"
        value={state}
        onChange={handleChange}
        autoComplete="off"
      />
    </label>
  );
};

export default InputPw;
