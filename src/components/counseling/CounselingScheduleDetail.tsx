import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal/Modal';
import { CounselingDetail } from '../../types/counseling/counselingDetail';
import { ReactComponent as Profile24 } from '../../assets/icons/Profile_24.svg';
import { ReactComponent as Close } from '../../assets/icons/Close.svg';

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

  const handleConfirmModal = () => {
    // 상담 내용 저장 로직 구현 (예: API 호출)
    handleCloseModal();
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
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        content={
          <>
            <div className="flex justify-between mb-3">
              <h1 className="text-lg font-bold">상담기록</h1>
              <button type="button" onClick={handleCloseModal}>
                <Close />
              </button>
            </div>
            <p className="mb-3">회원님과 나눈 내용을 자유롭게 작성해 보세요.</p>
            <textarea
              className="w-full p-2 border rounded"
              placeholder="내용을 입력해 주세요. (1000자 이내)"
              value={counselingContent}
              onChange={(e) => setCounselingContent(e.target.value)}
            />
          </>
        }
      />
    </>
  );
};
export default CounselingScheduleDetail;
