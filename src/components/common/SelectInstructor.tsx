import React, { useState } from 'react';
import NameTag from './NameTag';

interface SelectInstructorProps {
  title: string;
  defaultState?: string;
  onSelect?: (selectedInstructor: string) => void;
}

const SelectInstructor = ({ title, defaultState, onSelect }: SelectInstructorProps) => {
  const [state, setState] = useState<string>(defaultState || '');
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
    onSelect?.(event.target.value);
  };

  // 강사 선택 취소
  const handleRemoveInstructor = () => {
    setState('');
    onSelect?.('');
  };

  return (
    <label htmlFor="selectInstructor" className="my-5">
      <p className="small-title">
        {title}
        <span className="text-primary-300">*</span>
      </p>
      <div className="flex items-center">
        <select
          id="selectInstructor"
          className={`input-select ${state ? 'bg-bg-100' : ''} mr-4`}
          name="instructor"
          value={state}
          onChange={handleChange}
          disabled={!!state}>
          <option value="">선택하기</option>
          <option value="박강사">박강사</option>
          <option value="김강사">김강사</option>
        </select>

        {/* 선택된 강사 출력 */}
        {state && <NameTag name={state} handleRemove={handleRemoveInstructor} />}
      </div>
    </label>
  );
};

export default SelectInstructor;
