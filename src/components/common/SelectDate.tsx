import React from 'react';
import { useRecoilState } from 'recoil';
import commonState from '../../atoms/commonAtom';

interface SelectDateProps {
  title: string;
}

const SelectDate = ({ title }: SelectDateProps) => {
  const [common, setCommon] = useRecoilState(commonState);

  // 내용 업데이트
  const handleChange = (event: React.ChangeEvent<{ name: string; value: unknown }>) => {
    const { name, value } = event.target;
    if (name) {
      setCommon((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <label htmlFor="selectDate" className="my-5">
      <p className="small-title">
        {title}
        <span className="text-primary-300">*</span>
      </p>
      <input
        id="selectDate"
        className="input-select"
        type="date"
        name="date"
        value={common.date}
        onChange={handleChange}
      />
    </label>
  );
};

export default SelectDate;
