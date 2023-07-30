import React, { ChangeEvent } from 'react';

interface SelectProps {
  name: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
}

const Select: React.FC<SelectProps> = ({ name, options, value, onChange, label }) => (
  <>
    {label && <label htmlFor={name}>{label}</label>}
    <select id={name} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </>
);
export default Select;
