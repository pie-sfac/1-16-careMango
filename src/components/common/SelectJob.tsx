import React, { useState } from 'react';
import NameTag from './NameTag';

interface SelectJobProps {
  title: string;
  defaultState?: string;
  onSelect?: (selectedInstructor: string) => void;
}

const SelectJob = ({ title, defaultState, onSelect }: SelectJobProps) => {
  const [state, setState] = useState<string>(defaultState || '');
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
    onSelect?.(event.target.value);
  };

  return (
    <label htmlFor="selectJob" className="my-5">
      <p className="small-title">{title}</p>
      <div className="flex items-center">
        <select id="selectJob" className="input-select" name="instructor" value={state} onChange={handleChange}>
          <option value="">선택해주세요</option>
          <option value="사무직">사무직</option>
          <option value="현장직">현장직</option>
          <option value="가사노동자">가사노동자</option>
          <option value="학생">학생</option>
          <option value="무직">무직</option>
          <option value="기타">기타 - 직접입력</option>
        </select>
      </div>
    </label>
  );
};

export default SelectJob;
