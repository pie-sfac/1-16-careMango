import React, { useState, ChangeEvent } from 'react';

interface InputNameProps {
  title: string;
  onChange: (value: string) => void;
  // onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputName = ({ title, onChange }: InputNameProps) => {
  const [state, setState] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <label htmlFor="inputName" className="my-5">
      <p className="small-title">
        {title}
        <span className="text-primary-300">*</span>
      </p>
      <input id="inputName" className="input-select" type="text" name="name" value={state} onChange={handleChange} />
    </label>
  );
};

export default InputName;
