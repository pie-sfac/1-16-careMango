import React from 'react';
import { useRecoilState } from 'recoil';
import commonState from '../../atoms/commonAtom';

interface SelectTimeProps {
  title: string;
}

const SelectTime = ({ title }: SelectTimeProps) => {
  const [common, setCommon] = useRecoilState(commonState);

  // 내용 업데이트
  const handleChange = (event: React.ChangeEvent<{ name: string; value: unknown }>) => {
    const { name, value } = event.target;
    if (name) {
      setCommon((prev) => ({ ...prev, [name]: value }));
    }
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
          value={common.startTime}
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
          value={common.endTime}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default SelectTime;
