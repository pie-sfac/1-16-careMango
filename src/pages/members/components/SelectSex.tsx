import React, { useState } from 'react';

interface SelectSexProps {
  title: string;
  defaultState?: string;
  onChange?: (selectedSex: string) => void;
}

const SelectSex = ({ title, defaultState, onChange }: SelectSexProps) => {
  const [state, setState] = useState<string>(defaultState || '');

  const handleClick = (sex: string) => {
    setState(sex);
    onChange?.(sex);
  };

  return (
    <div className="my-5">
      <p className="small-title">
        {title}
        <span className="text-primary-300">*</span>
      </p>
      <button
        type="button"
        className={`mr-1 attendance-btn ${state === 'FEMALE' ? 'bg-primary-300 text-white' : ''}`}
        onClick={() => handleClick('FEMALE')}>
        여
      </button>
      <button
        type="button"
        className={`attendance-btn ${state === 'MALE' ? 'bg-primary-300 text-white' : ''}`}
        onClick={() => handleClick('MALE')}>
        남
      </button>
    </div>
  );
};

export default SelectSex;