import React, { useState } from 'react';

interface SelectTimeProps {
  title: string;
  defaultState?: {
    startAt: string;
    endAt: string;
  };
  width?: string;
  onChange?: (selectedTime: { startAt: string; endAt: string }) => void;
}

const SelectTime = ({ title, defaultState, width, onChange }: SelectTimeProps) => {
  const [state, setState] = useState<{ startAt: string; endAt: string }>({
    startAt: defaultState?.startAt || '',
    endAt: defaultState?.endAt || '',
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedState = { ...state, [name]: value };
    setState(updatedState);
    onChange?.(updatedState);
  };

  return (
    <div className="block mt-10 mb-2">
      <p>
        {title}
        <span className="text-primary-300">*</span>
      </p>
      <label htmlFor="startAt">
        <input
          className={`${width} input-select`}
          type="time"
          id="startAt"
          name="startAt"
          value={state.startAt}
          onChange={handleChange}
        />
      </label>
      <span> ~ </span>
      <label htmlFor="endAt">
        <input
          className={`${width} input-select`}
          type="time"
          id="endAt"
          name="endAt"
          value={state.endAt}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default SelectTime;
