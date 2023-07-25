import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { commonState } from '../../atoms/commonAtom';

const InputMemo = () => {
  const [common, setCommon] = useRecoilState(commonState);
  const [memoLength, setMemoLength] = useState(0);

  // 메모 길이
  useEffect(() => {
    setMemoLength(common.memo.length || 0);
  }, [common.memo]);

  // 내용 업데이트
  const handleChange = (event: React.ChangeEvent<{ name: string; value: unknown }>) => {
    const { name, value } = event.target;
    if (name) {
      setCommon((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <label htmlFor="inputMemo" className="my-5">
      <p className="small-title">일정 메모</p>
      <div className="relative">
        <textarea
          id="inputMemo"
          className="block w-full pb-1 input-select"
          name="memo"
          value={common.memo}
          onChange={handleChange}
          placeholder="내용을 입력해 주세요. (500자 이내)"
        />
        <p className="mt-4 text-right text-gray-400">{memoLength}/500자</p>
      </div>
    </label>
  );
};

export default InputMemo;
