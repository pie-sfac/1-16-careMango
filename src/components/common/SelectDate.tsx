import React, { useState } from 'react';

interface SelectDateProps {
  title: string;
}

const SelectDate = ({ title }: SelectDateProps) => {
  const [state, setState] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  return (
    <label htmlFor="selectDate" className="my-5">
      <p className="small-title">
        {title}
        <span className="text-primary-300">*</span>
      </p>
      <input id="selectDate" className="input-select" type="date" name="date" value={state} onChange={handleChange} />
    </label>
  );
};

export default SelectDate;
