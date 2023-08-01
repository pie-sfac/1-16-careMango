import React, { ChangeEvent } from 'react';

interface SelectProps {
  name: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  required?: boolean;
  width?: string;
}

const Select: React.FC<SelectProps> = ({ name, options, value, onChange, label, required, width = 'w-24' }) => (
  <>
    {label && (
      <label htmlFor={name} className="block my-5">
        {label}
        {required && <span className="text-primary-300 w-">*</span>}
      </label>
    )}
    <select id={name} name={name} value={value} onChange={onChange} className={`${width} input-select m-0`}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </>
);
export default Select;
