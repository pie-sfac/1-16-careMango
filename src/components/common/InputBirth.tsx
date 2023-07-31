import React, { ChangeEvent, useState } from 'react';

interface InputBirthProps {
  title: string;
  onChange: (value: string) => void;
  // onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputBirth = ({ title, onChange }: InputBirthProps) => {
  const [state, setState] = useState<string>('');

  // 생년월일 입력시 점으로 구분
  const numberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: rawValue } = event.target;
    let value = rawValue.replace(/\D/g, '');

    if (value.length > 8) return;
    if (value.length > 4) {
      value = value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    }
    setState(value);
    onChange?.(value);
  };

  return (
    <label htmlFor="inputBirth" className="my-5">
      <p className="small-title">
        {title}
        <span className="text-primary-300">*</span>
      </p>
      <input
        id="inputBirth"
        className="input-select"
        type="text"
        placeholder="0000.00.00"
        name="name"
        value={state}
        onChange={numberChange}
      />
    </label>
  );
};

export default InputBirth;
