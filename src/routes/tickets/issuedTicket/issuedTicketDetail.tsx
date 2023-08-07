import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SubHeader from '../../../components/common/SubHeader';
import { axiosInstance } from '../../../utils/apiInstance';
import { TicketsData } from '../../../types/tickets/tickets';
import { LessonTypeEnum, TermUnitEnum } from '../../../enums/Ticket';
import Input from '../../../components/common/Input/Input';
import { calculateDate, getDay, getDay2 } from '../../../utils/date';
import { ReactComponent as Plus } from '../../../assets/icons/Plus.svg';
import { ReactComponent as Minus } from '../../../assets/icons/Minus.svg';
import SelectCounselor from '../../../components/common/SelectCounselor';

const IssuedTicketDetail = () => {
  const [ticket, setTicket] = useState<TicketsData | null>(null);
  const { ticketId } = useParams<{ ticketId: string | undefined }>();

  const [startDate, setStartDate] = useState(getDay());
  const [endDate, setEndDate] = useState('');
  const [privateTutorId, setPrivateTutorId] = useState(0);

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
            <h1 className="main-title">{ticket.title}</h1>
            <p className="text-sm text-primary-500">{LessonTypeEnum[ticket.lessonType]}</p>
          </div>

          <Input name="title" type="text" value={ticket.title} label="수강권명" width="w-80" />

          {/* 수강권 유효기간 맞춰서 기간설정 필요 */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="start" className="block mt-10 mb-2">
            유효기간 <span className="text-primary-300">*</span>
          </label>
          <div className="flex items-center">
            <Input name="start" type="date" value={startDate} onChange={handleChange} /> ~
            <Input name="end" type="date" value={endDate} onChange={handleChange} />
          </div>

          <Input
            name="defaultTerm"
            type="text"
            value={ticket.defaultTerm}
            label="수강권기간"
            width="w-80"
            unit={TermUnitEnum[ticket.defaultTermUnit]}
          />

          <Input
            name="defaultCount"
            type="number"
            value={ticket.defaultCount}
            label="기본횟수"
            unit="회"
            width="w-80"
          />

          <Input
            name="maxServiceCount"
            type="number"
            value={ticket.maxServiceCount}
            label="서비스 횟수"
            leftBtn={
              <button type="button" className="mr-2 icon-btn">
                <Minus />
              </button>
            }
            rightBtn={
              <button type="button" className="ml-2 icon-btn">
                <Plus />
              </button>
            }
            unit="회"
            align="text-center"
            width="w-72"
          />

          <SelectCounselor title="담당 강사 선택" onChange={(e) => setPrivateTutorId(e.target.value)} />

          <button className="w-full py-3 my-5 text-white rounded mt-36 bg-primary-500" type="submit">
            저장
          </button>
        </>
      )}
    </>
  );
};
export default IssuedTicketDetail;
