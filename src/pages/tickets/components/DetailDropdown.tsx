import { useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import Modal from '@components/common/Modal/Modal';

interface DropDownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
}

const DetailDropDown = ({ isOpen, setIsOpen, isActive }: DropDownProps) => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const deActiveTicketMutation = useMutation(
    async () => {
      const res = await axiosInstance.post(`/tickets/${ticketId}/deactivate`);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['ticket', ticketId]);
      },
    },
  );

  const activeTicketMutation = useMutation(
    async () => {
      const res = await axiosInstance.post(`/tickets/${ticketId}/activate`);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['ticket', ticketId]);
      },
    },
  );
  const removeTicketMutation = useMutation(
    async () => {
      const res = await axiosInstance.delete(`/tickets/${ticketId}`);
      return res.data;
    },
    {
      onSuccess: () => {
        navigate('/tickets/center');
      },
    },
  );

  const handleConfirmStatus = () => {
    if (isActive) {
      deActiveTicketMutation.mutate();
    }
    if (!isActive) {
      activeTicketMutation.mutate();
    }
  };

  const handleConfirmRemove = () => {
    removeTicketMutation.mutate();
  };

  const handleClickEdit = () => {
    navigate(`/tickets/${ticketId}/edit`);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <>
          <ul className="absolute right-0 w-48 text-left bg-white border border-gray-300 rounded-md shadow-md top-10">
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={handleClickEdit}>
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
