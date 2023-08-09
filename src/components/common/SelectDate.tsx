import React, { ChangeEvent } from 'react';

interface SelectDateProps {
  // title: string;
  type?: string;
  // defaultState?: string;
  // onChange?: (selectedDate: string) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | undefined;
  label?: string;
  name?: string;
  placeholder?: string;
  width?: string;
}

const SelectDate = ({ type, onChange, value, label, name, placeholder, width }: SelectDateProps) => (
  // const [state, setState] = useState<string>(defaultState || '');
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState(event.target.value);
  //   onChange?.(event.target.value);
  // };

  // return (
  <label htmlFor="selectDate" className="block mt-10 mb-2">
    <p>
      {label}
      <span className="text-primary-300">*</span>
    </p>
    <input
      id="selectDate"
      className="input-select"
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      width={width}
      onChange={onChange}
    />
  </label>
  // );
);

export default SelectDate;
