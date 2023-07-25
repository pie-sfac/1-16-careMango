import React from 'react';
import { useRecoilState } from 'recoil';
import { commonState } from '../../atoms/commonAtom';

const SelectDate = () => {
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
        일자 선택<span className="text-primary-300">*</span>
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
