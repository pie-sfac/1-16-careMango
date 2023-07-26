import React, { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import commonState from '../../atoms/commonAtom';

interface InputContactProps {
  title: string;
}

const InputContact = ({ title }: InputContactProps) => {
  const [common, setCommon] = useRecoilState(commonState);

  // 전화번호 입력시 자동 하이픈
  const numberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: rawValue } = event.target;
    let value = rawValue.replace(/\D/g, ''); // 모든 숫자가 아닌 문자를 제거

    if (value.length > 11) return;
    if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    setCommon((prev) => ({
      ...prev,
      contact: value,
    }));
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
        value={common.contact}
        onChange={numberChange}
        placeholder="010-1234-5678"
      />
    </label>
  );
};

export default InputContact;
