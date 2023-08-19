import { useState, useEffect } from 'react';

interface SelectSexProps {
  title: string;
  defaultState?: string;
  onChange?: (selectedSex: string) => void;
}

const SelectSex = ({ title, defaultState, onChange }: SelectSexProps) => {
  const [state, setState] = useState<string>(defaultState || '');

  useEffect(() => {
    if (defaultState) {
      setState(defaultState);
    }
  }, [defaultState]);

  const handleClick = (sex: string) => {
    setState(sex);
    onChange?.(sex);
  };

  return (
    <div className="my-5">
      <p className="block mt-10 mb-2">
        {title}
        <span className="text-primary-300">*</span>
      </p>
      <button
        type="button"
        className={`mr-1 w-2/12 attendance-btn ${state === 'FEMALE' ? 'bg-primary-300 text-white' : ''}`}
        onClick={() => handleClick('FEMALE')}>
        여
      </button>
      <button
        type="button"
        className={`w-2/12 attendance-btn ${state === 'MALE' ? 'bg-primary-300 text-white' : ''}`}
        onClick={() => handleClick('MALE')}>
        남
      </button>
    </div>
  );
};

export default SelectSex;
