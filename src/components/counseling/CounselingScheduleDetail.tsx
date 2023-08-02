import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CounselingModal from './CounselingModal';
import { CounselingDetail } from '../../types/counseling/counselingDetail';
import { ReactComponent as Profile24 } from '../../assets/icons/Profile_24.svg';

interface CounselingScheduleDetailProps {
  itemData: CounselingDetail;
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

  // 회원 정보 등록 페이지로
  const navigate = useNavigate();
  const goCreatMembers = () => {
    navigate('/members', { state: { register: true } });
  };

  return (
    <>
      <div className="flex items-center p-5 border-b gap-28 border-line-200">
        <div className="flex gap-3">
          <Profile24 />

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
            className="px-5 py-2 border border-[#E7E7E7] rounded text-primary-300 active:bg-gray-200"
            onClick={goCreatMembers}>
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
