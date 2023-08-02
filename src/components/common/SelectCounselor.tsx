import React, { useState } from 'react';
import NameTag from './NameTag';

interface SelectCounselorProps {
  title: string;
  defaultState?: string;
  onChange?: (selectedCounselor: string | number) => void;
}

const SelectCounselor = ({ title, defaultState, onChange }: SelectCounselorProps) => {
  const [state, setState] = useState<string>(defaultState || '');
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
    onChange?.(+event.target.value);
  };

  // 강사 Id와 이름 매핑
  const counselorNames: { [key: number]: string } = {
    1: '박강사',
    2: '김강사',
  };

  // 강사 선택 취소
  const handleRemoveCounselor = () => {
    setState('');
    onChange?.(-1);
  };

  return (
    <label htmlFor="selectCounselor" className="my-5">
      <p className="small-title">
        {title}
        <span className="text-primary-300">*</span>
      </p>
      <div className="flex items-center">
        <select
          id="selectCounselor"
          className={`input-select ${state ? 'bg-bg-100' : ''} mr-4`}
          name="counselor"
          value={state}
          onChange={handleChange}
          disabled={!!state}>
          <option value={0}>선택하기</option>
          <option value={1}>박강사</option>
          <option value={2}>김강사</option>
        </select>

        {/* 선택된 강사 출력 */}
        {state && <NameTag name={counselorNames[+state]} handleRemove={handleRemoveCounselor} />}
      </div>
    </label>
  );
};

export default SelectCounselor;
