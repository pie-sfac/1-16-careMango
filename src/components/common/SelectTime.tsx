import React, { useState } from 'react';
interface SelectTimeProps {
  title: string;
}

const SelectTime = ({ title }: SelectTimeProps) => {
  const [state, setState] = useState<{ startTime: string; endTime: string }>({
    startTime: '',
    endTime: '',
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="my-5">
      <p className="small-title">
        {title}
        <span className="text-primary-300">*</span>
      </p>
      <label htmlFor="startTime">
        <input
          className="input-select"
          type="time"
          id="startTime"
          name="startTime"
          value={state.startTime}
          onChange={handleChange}
        />
      </label>
      <span> ~ </span>
      <label htmlFor="endTime">
        <input
          className="input-select"
          type="time"
          id="endTime"
          name="endTime"
          value={state.endTime}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default SelectTime;
