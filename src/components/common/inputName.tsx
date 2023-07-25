import React from 'react';
import { useRecoilState } from 'recoil';
import { commonState } from '../../atoms/commonAtom';

const InputName = () => {
  const [common, setCommon] = useRecoilState(commonState);

  // 내용 업데이트
  const handleChange = (event: React.ChangeEvent<{ name: string; value: unknown }>) => {
    const { name, value } = event.target;
    if (name) {
      setCommon((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <label htmlFor="inputName" className="my-5">
      <p className="small-title">
        이름<span className="text-primary-300">*</span>
      </p>
      <input
        id="inputName"
        className="input-select"
        type="text"
        name="name"
        value={common.name}
        onChange={handleChange}
      />
    </label>
  );
};

export default InputName;
