import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SubHeader from '../../components/common/SubHeader';
import { axiosInstance } from '../../utils/apiInstance';
import { TicketsData } from '../../types/tickets/tickets';
import { LessonTypeEnum } from '../../enums/Ticket';
import Input from '../../components/common/Input';
import { calculateDate, getDay, getDay2 } from '../../utils/date';

const TicketDetail = () => {
  const [ticket, setTicket] = useState<TicketsData | null>(null);
  const { ticketId } = useParams<{ ticketId: string | undefined }>();

  const [startDate, setStartDate] = useState(getDay());
  const [endDate, setEndDate] = useState('');

  const getTicket = useCallback(async () => {
    const res = await axiosInstance.get(`tickets/${ticketId}`);
    setTicket(res.data);
    console.log(res.data);
    const term = res.data.defaultTerm;
    const termUnit = res.data.defaultTermUnit;
    const calculatedEndDate = calculateDate(startDate, termUnit, term);
    setEndDate(getDay2(calculatedEndDate));
  }, [ticketId, startDate]);

  useEffect(() => {
    getTicket();
  }, [getTicket]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'start') {
      setStartDate(value);
    }
    if (name === 'end') {
      setEndDate(value);
    }
  };

  const handleSubmit = () => {};

  return (
    <>
      <SubHeader title="수강권 상세" />
      {ticket && (
        <>
          <div className="flex items-center gap-4 mt-10 mb-6">
            <p className="my-2 font-bold">{ticket.title}</p>
            <p className="text-sm text-primary-500">{LessonTypeEnum[ticket.lessonType]}</p>
          </div>

          <Input name="title" type="text" value={ticket.title} label="수강권명" width="w-80" />

          {/* 수강권 유효기간 맞춰서 기간설정 필요 */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="start" className="block mt-10 mb-2">
            유효기간 <span className="text-primary-300">*</span>
          </label>
          <Input name="start" type="date" value={startDate} onChange={handleChange} />
          <Input name="end" type="date" value={endDate} onChange={handleChange} />
        </>
      )}
    </>
  );
};
export default TicketDetail;
