import React, { useState } from 'react';
import NameTag from './NameTag';

interface SelectVisitRouteProps {
  title: string;
  defaultState?: string;
  onSelect?: (selectedInstructor: string) => void;
}

const SelectVisitRoute = ({ title, defaultState, onSelect }: SelectVisitRouteProps) => {
  const [state, setState] = useState<string>(defaultState || '');
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
    onSelect?.(event.target.value);
  };

  return (
    <label htmlFor="selectVisitRoute" className="my-5">
      <p className="small-title">{title}</p>
      <div className="flex items-center">
        <select id="selectVisitRoute" className="input-select" name="instructor" value={state} onChange={handleChange}>
          <option value="">선택해주세요</option>
          <option value="주변 추천">주변 추천</option>
          <option value="오프라인 광고">오프라인 광고 (배너, 현수막)</option>
          <option value="SNS광고">SNS광고 (페이스북, 인스타)</option>
          <option value="네이버 지도">네이버 지도</option>
          <option value="기타">기타 - 직접입력</option>
        </select>

        {/* 선택된 강사 출력 */}
        {/* {state && <NameTag name={state} handleRemove={handleRemoveInstructor} />} */}
      </div>
    </label>
  );
};

export default SelectVisitRoute;
