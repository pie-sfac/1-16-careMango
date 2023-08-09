import React, { useState } from 'react';

interface AgreeConditonProps {
  title: string;
  defaultState?: boolean;
  onChange?: (selectedAgree: boolean) => void;
}

const AgreeCondition = ({ title, defaultState, onChange }: AgreeConditonProps) => {
  const [state, setState] = useState<boolean>(defaultState || false);
  const handleAgreementChange = () => {
    const newState = !state;
    setState(newState);
    onChange?.(newState);
  };

  const viewTerms = () => {
    alert('약관');
  };

  return (
    <div className="my-5">
      <p className="small-title">
        {title}
        <span className="text-primary-300">*</span>
      </p>
      <p className="mb-4">회원 분의 약관동의를 받아주세요</p>
      <div className="flex items-center p-5 rounded-lg bg-bg-100 ">
        <input
          id="checkBox"
          type="checkbox"
          checked={state}
          onChange={handleAgreementChange}
          className="w-5 h-5 text-blue-600 form-checkbox"
        />
        <div className="ml-2">(필수)제 3자 정보 제공 약관. 동의합니다.</div>
        <button onClick={viewTerms} type="button" className="ml-4 underline focus:outline-none">
          약관보기
        </button>
      </div>
    </div>
  );
};

export default AgreeCondition;
