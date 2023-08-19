import { useState, useEffect } from 'react';

interface InputMemoProps {
  title: string;
  name?: string;
  value?: string;
  onChange: (value: string) => void;
  width?: string;
  height?: string;
}

const InputMemo = ({ title, width, height, name, value, onChange }: InputMemoProps) => {
  const [state, setState] = useState<string>('');
  const [memoLength, setMemoLength] = useState(0);

  // 메모 길이
  useEffect(() => {
    setMemoLength(state.length || 0);
  }, [state]);

  // 내용 업데이트
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <label htmlFor="inputMemo" className="block mt-10 mb-2">
      <p>{title}</p>
      <div className="relative">
        <textarea
          id="inputMemo"
          className={`${width} ${height} block pb-1 input-select`}
          name={name}
          value={state}
          onChange={handleChange}
          placeholder="내용을 입력해 주세요. (500자 이내)"
        />
        <p className={`${width} mt-4 text-right text-gray-400`}>{memoLength}/500자</p>
      </div>
    </label>
  );
};

export default InputMemo;
