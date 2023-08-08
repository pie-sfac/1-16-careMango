import React, { useState } from 'react';

interface SelectDateProps {
  title: string;
  defaultState?: string;
  width?: string;
  onChange?: (selectedDate: string) => void;
}

const SelectDate = ({ title, defaultState, width, onChange }: SelectDateProps) => {
  const [state, setState] = useState<string>(defaultState || '');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <label htmlFor="selectDate" className="block mt-10 mb-2">
      <p>
        {title}
        <span className="text-primary-300">*</span>
      </p>
      <input
        id="selectDate"
        className={`${width} input-select`}
        type="date"
        name="date"
        value={state}
        onChange={handleChange}
      />
    </label>
  );
};

export default SelectDate;
