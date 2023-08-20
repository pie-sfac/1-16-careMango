import Card from '@components/common/Card/Card';
import { IssuedTicketsData } from '@/types/tickets/tickets';
import { LessonTypeEnum } from '@/enums/Ticket';
import { ReactComponent as Ticket } from '@/assets/icons/Ticket.svg';
import { ReactComponent as TicketIn } from '@/assets/icons/TicketIn.svg';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import Modal from '@components/common/Modal/Modal';
import { useState } from 'react';
import { getDay } from '@/utils/date';
import { useMutation, useQueryClient } from 'react-query';

const IssuedTicketItem = ({ ticket }: { ticket: IssuedTicketsData }) => {
  const navigate = useNavigate();
  const issuedTicketId = ticket.id;
  const goIssuedTicketDetail = () => {
    navigate(`/issued-tickets/${issuedTicketId}`);
  };

  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [refundModalOpen, setRefundModalOpen] = useState(false);

  const openSuspendModal = () => {
    setSuspendModalOpen(true);
  };
  const closeSuspendModal = () => {
    setSuspendModalOpen(false);
  };
  const openRefundModal = () => {
    setRefundModalOpen(true);
  };
  const closeRefundModal = () => {
    setRefundModalOpen(false);
  };

  const queryClient = useQueryClient();

  const suspnedMutation = useMutation(
    async () => {
      const res = await axiosInstance.post(`/issued-tickets/${issuedTicketId}/suspend`);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['issuedTicket', issuedTicketId]);
      },
    },
  );

  const unSuspendMutation = useMutation(
    async () => {
      const res = await axiosInstance.post(`/issued-tickets/${issuedTicketId}/unsuspend`);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['issuedTicket', issuedTicketId]);
      },
    },
  );

  const handleSuspendStatus = async () => {
    if (ticket.isSuspended) {
      unSuspendMutation.mutate();
    }
    if (!ticket.isSuspended) {
      suspnedMutation.mutate();
    }
  };

  const handleRefund = async () => {
    await axiosInstance.post(`/issued-tickets/${issuedTicketId}/refund`);
  };

  return (
    <Card>
      <article className="w-[30rem] flex justify-between">
        <div
          className={`px-6 py-8 cursor-pointer ${ticket.isSuspended && 'text-text-400'}`}
          onClick={goIssuedTicketDetail}>
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="my-2 font-bold">{ticket.title}</p>
              <p className={`text-sm ${ticket.isSuspended ? 'text-text-400' : 'text-primary-500'}`}>
                {LessonTypeEnum[ticket.lessonType]}{' '}
                {ticket.isSuspended && <span className="text-sm text-erro">{getDay(ticket.suspendedAt)} 일시중단</span>}
              </p>
            </div>
            {ticket.isSuspended ? <TicketIn /> : <Ticket />}
          </div>

          <div className="flex items-end justify-between">
            <ul>
              <li>
                <span className="inline-block w-20 text-text-400">잔여 횟수</span> {ticket.remainingCount}회
              </li>
              <li>
                <span className="inline-block w-20 text-text-400">유효 기간</span> {ticket.startAt} - {ticket.endAt}
              </li>
            </ul>
          </div>
        </div>
        <ul className="flex flex-col justify-center gap-12 px-6 py-8 mr-0 text-center bg-bgc-50 rounded-r-xl">
          <li>
            {!ticket.isSuspended ? (
              <button type="button" className="text-primary-500" onClick={openSuspendModal}>
                수강권 일시중단
              </button>
            ) : (
              <button type="button" className="text-text-400" onClick={openSuspendModal}>
                수강권 재진행
              </button>
            )}
          </li>
          <li>
            <button
              type="button"
              className={`${ticket.isSuspended ? 'text-text-400' : 'text-primary-500'}`}
              onClick={openRefundModal}>
              환불
            </button>
          </li>
        </ul>
        <Modal
          isOpen={suspendModalOpen}
          content={`해당 수강권을 ${!ticket.isSuspended ? '일시중단' : '재진행'} 하시겠습니까?`}
          onClose={closeSuspendModal}
          onConfirm={handleSuspendStatus}
        />
        <Modal
          isOpen={refundModalOpen}
          content={`해당 수강권을 환불하시겠습니까?`}
          onClose={closeRefundModal}
          onConfirm={handleRefund}
        />
      </article>
    </Card>
  );
};
export default IssuedTicketItem;
