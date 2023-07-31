import React, { ChangeEvent, useState } from 'react';

interface InputContactProps {
  title: string;
  onChange: (value: string) => void;
  // onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputContact = ({ title, onChange }: InputContactProps) => {
  const [state, setState] = useState<string>('');

  // 전화번호 입력시 자동 하이픈
  const numberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: rawValue } = event.target;
    let value = rawValue.replace(/\D/g, '');

    if (value.length > 11) return;
    if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    setState(value);
    onChange?.(value);
  };

  return (
    <label htmlFor="inputContact" className="my-5">
      <p className="small-title">
        {title}
        <span className="text-primary-300">*</span>
      </p>
      <input
        id="inputContact"
        className="input-select"
        type="tel"
        name="contact"
        value={state}
        onChange={numberChange}
        placeholder="010-1234-5678"
      />
    </label>
  );
};

export default InputContact;
