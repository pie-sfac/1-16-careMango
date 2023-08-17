import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import Modal from '@components/common/Modal/Modal';

interface DropDownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
  getTicket: () => void;
}

const DetailDropDown = ({ isOpen, setIsOpen, isActive, getTicket }: DropDownProps) => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const openStatusModal = () => {
    setStatusModalOpen(true);
  };
  const closeStatusModal = () => {
    setStatusModalOpen(false);
  };
  const openRemoveModal = () => {
    setRemoveModalOpen(true);
  };
  const closeRemoveModal = () => {
    setRemoveModalOpen(false);
  };

  // 판매종료/ 판매가능
  const handleConfirmStatus = async () => {
    if (isActive) {
      console.log('판매종료');
      await axiosInstance.post(`/tickets/${ticketId}/deactivate`);
    }
    if (!isActive) {
      console.log('판매가능');
      await axiosInstance.post(`/tickets/${ticketId}/activate`);
    }
    getTicket();
  };

  // 수강권 삭제
  const handleConfirmRemove = async () => {
    await axiosInstance.delete(`/tickets/${ticketId}`);
    navigate('/tickets/center');
  };

  // 편집/ 수강권 삭제
  const handleOptionClick = (option: string) => {
    if (option === '편집') {
    }
    if (option === '수강권 삭제') {
    }
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <>
          <ul className="absolute right-0 w-48 text-left bg-white border border-gray-300 rounded-md shadow-md top-10">
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleOptionClick('편집')}>
              편집
            </li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={openStatusModal}>
              {isActive ? '판매종료' : '판매가능'}
            </li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={openRemoveModal}>
              수강권 삭제
            </li>
          </ul>
        </>
      )}
      <Modal
        isOpen={statusModalOpen}
        content={`해당 수강권을 ${isActive ? '판매종료' : '판매가능'}처리 하시겠습니까?`}
        onClose={closeStatusModal}
        onConfirm={handleConfirmStatus}
      />
      <Modal
        isOpen={removeModalOpen}
        content={`해당 수강권을 삭제하시겠습니까?`}
        onClose={closeRemoveModal}
        onConfirm={handleConfirmRemove}
      />
    </>
  );
};

export default DetailDropDown;
