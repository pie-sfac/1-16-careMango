import React, { useState } from 'react';
import CounselingModal from './CounselingModal';
import { CounselingScheduleItemData } from '../../types/counseling/counselingSchedule';

interface CounselingScheduleDetailProps {
  itemData: CounselingScheduleItemData;
}

const CounselingScheduleDetail = ({ itemData }: CounselingScheduleDetailProps) => {
  const [counselingContent, setCounselingContent] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="flex items-center p-5 border-b gap-28 border-line-200">
        <div className="flex gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g clipPath="url(#clip0_18_8567)">
              <circle cx="12" cy="12" r="11.625" fill="#F4F4F4" stroke="#CFCFCF" strokeWidth="0.75" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.9072 12.64C14.541 12.2351 15.7521 10.759 15.7521 9C15.7521 6.92893 14.0731 5.25 12.0021 5.25C9.93098 5.25 8.25205 6.92893 8.25205 9C8.25205 10.8022 9.52332 12.3074 11.218 12.6679C6.637 13.1599 3.19643 16.4669 3.48243 20.3516C9.83841 26.114 18.6869 22.3474 20.7931 19.9672C20.5271 16.3544 17.0923 12.9812 12.9072 12.64Z"
                fill="#CFCFCF"
              />
            </g>
            <defs>
              <clipPath id="clip0_18_8567">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <div className="flex flex-col">
            <p className="font-bold">{itemData.client.name}</p>
            <p>{itemData.client.phone}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            className="px-5 py-2 border border-[#E7E7E7] rounded text-primary-300 active:bg-gray-200"
            onClick={handleOpenModal}>
            상담기록
          </button>

          <button
            type="button"
            className="px-5 py-2 border border-[#E7E7E7] rounded text-primary-300 active:bg-gray-200">
            회원 정보 등록
          </button>
        </div>
      </div>
      <CounselingModal
        isOpen={showModal}
        onClose={handleCloseModal}
        content={counselingContent}
        setContent={setCounselingContent}
      />
    </>
  );
};
export default CounselingScheduleDetail;
