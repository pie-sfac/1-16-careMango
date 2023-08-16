import React, { useState } from 'react';
import Modal from '@components/common/Modal/Modal';

interface AgreeConditonProps {
  title: string;
  defaultState?: boolean;
  onChange?: (selectedAgree: boolean) => void;
}

const AgreeCondition = ({ title, defaultState, onChange }: AgreeConditonProps) => {
  const [state, setState] = useState<boolean>(defaultState || false);
  const [showModal, setShowModal] = useState(false);

  const handleAgreementChange = () => {
    const newState = !state;
    setState(newState);
    onChange?.(newState);
  };

  const viewTerms = () => {
    setShowModal(true);
  };

  const closeTermsModal = () => {
    setShowModal(false);
  };

  return (
    <div className="my-5">
      <p className="block mt-10 mb-2 font-bold">
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
      <Modal
        isOpen={showModal}
        content={
          <div className="w-96">
            <h1 className="flex justify-center mb-5 text-lg font-bold">포인티 이용약관(필수)</h1>
            <div className="overflow-y-auto max-h-[496px]">
              <h2 className="mb-5 text-lg font-bold">총칙</h2>
              <div className="mb-5">
                <h3 className="font-bold text-md">제1조 [목적]</h3>
                <p>
                  이 약관은 주식회사 파이헬스케어(이하 ‘포인티'라 함)가 운영하는 CRM 서비스에서 제공하는 전자 서비스
                  이용 관련 서비스(이하 ‘서비스'라 함)를 이용함에 있어 포인티와 이용자의 권리, 의무 및 책임사항을
                  규정함을 목적으로 합니다. PC통신, 스마트폰 앱, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에
                  반하지 않는한 이 약관을 준용합니다.
                </p>
              </div>
              <div className="mb-5">
                <h3 className="font-bold text-md">제2조 [정의]</h3>
                <p>
                  이 약관은 주식회사 파이헬스케어(이하 ‘포인티'라 함)가 운영하는 CRM 서비스에서 제공하는 전자 서비스
                  이용 관련 서비스(이하 ‘서비스'라 함)를 이용함에 있어 포인티와 이용자의 권리, 의무 및 책임사항을
                  규정함을 목적으로 합니다. PC통신, 스마트폰 앱, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에
                  반하지 않는한 이 약관을 준용합니다.
                </p>
              </div>
            </div>
          </div>
        }
        onClose={closeTermsModal}
        onConfirm={closeTermsModal}
        onlyConfirm={true}
        width="w-full"
      />
    </div>
  );
};

export default AgreeCondition;
