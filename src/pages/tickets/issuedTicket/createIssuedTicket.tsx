import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import SubHeader from '@components/common/SubHeader/SubHeader';
import { axiosInstance } from '@/utils/apiInstance';
import { TicketsData } from '@/types/tickets/tickets';
import { LessonTypeEnum, TermUnitEnum } from '@/enums/Ticket';
import Input from '@components/common/Input/Input';
import { calculateDate, getDay, getDay2 } from '@/utils/date';
import { ReactComponent as Plus } from '@/assets/icons/Plus.svg';
import { ReactComponent as Minus } from '@/assets/icons/Minus.svg';
import { memberIdState } from '@/atoms/members/memberIdAtom';
import Modal from '@components/common/Modal/Modal';
import SelectStaffs from '@pages/counseling/components/SelectStaffs';
import { Staff } from '@/types/staffs/staffs';
import GetStaffsList from '@pages/counseling/getStaffsList';

interface IssuedTicketData {
  memberIds: number[];
  serviceCount: number;
  privateTutorId: number;
  startAt: string;
  endAt: string;
}

const CreateIssuedTicket = () => {
  const [ticket, setTicket] = useState<TicketsData | null>(null);
  const { ticketId } = useParams<{ ticketId: string | undefined }>();

  const [startAt, setStartAt] = useState(getDay());
  const [endAt, setEndAt] = useState('');
  const [serviceCount, setServiceCount] = useState(0);

  const [privateTutorId, setPrivateTutorId] = useState(0);
  const [selectedStaff, setSelectedStaff] = useState<null | Staff>(null);
  const location = useLocation() as { state: { selectedStaff: Staff } };

  const memberId = useRecoilValue(memberIdState);
  console.log(memberId);

  const [modalOpen, setModalOpen] = useState(false);

  const [showComponentForm, setShowComponentForm] = useState(true);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // 수강권 상세 조회
  const getTicket = useCallback(async () => {
    const res = await axiosInstance.get(`tickets/${ticketId}`);
    setTicket(res.data);
    console.log(res.data);
    const term = res.data.defaultTerm;
    const termUnit = res.data.defaultTermUnit;
    const calculatedEndAt = calculateDate(startAt, termUnit, term);
    setEndAt(getDay2(calculatedEndAt));
    setServiceCount(res.data.maxServiceCount);
  }, [ticketId, startAt]);

  useEffect(() => {
    getTicket();
    if (location.state && location.state.selectedStaff) {
      setSelectedStaff(location.state.selectedStaff);
      setPrivateTutorId(location.state.selectedStaff.id);
    }
  }, [getTicket]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'start') {
      setStartAt(value);
    }
    if (name === 'end') {
      setEndAt(value);
    }
  };

  const handleSubmit = async () => {
    const data: IssuedTicketData = {
      memberIds: [Number(memberId.memberId)],
      serviceCount,
      privateTutorId,
      startAt,
      endAt,
    };
    console.log(data);
    const res = await axiosInstance.post(`/tickets/${ticketId}/issue`, data);
    console.log(res);
    // eslint-disable-next-line no-alert
    window.alert('수강권이 부여되었습니다!');
  };

  return (
    <>
      {showComponentForm ? (
        <>
          <SubHeader title="수강권 상세" />
          {ticket && (
            <>
              <div className="flex items-center gap-4 mt-10 mb-6">
                <h1 className="main-title">{ticket.title}</h1>
                <p className="text-sm text-primary-500">{LessonTypeEnum[ticket.lessonType]}</p>
              </div>

              <div className="flex flex-col flex-wrap h-96">
                <Input name="title" type="text" value={ticket.title} label="수강권명" width="w-80" />

                {/* 수강권 유효기간 맞춰서 기간설정 필요 */}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="start" className="block mt-10 mb-2">
                  유효기간 <span className="text-primary-300">*</span>
                </label>
                <div className="flex items-center">
                  <Input name="start" type="date" value={startAt} onChange={handleChange} required /> ~
                  <Input name="end" type="date" value={endAt} onChange={handleChange} required />
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

                <SelectStaffs
                  selectedStaff={selectedStaff}
                  setSelectedStaff={setSelectedStaff}
                  setPrivateTutorId={setPrivateTutorId}
                  setShowComponentForm={setShowComponentForm}
                />
              </div>

              <button
                className="w-full py-3 my-5 text-white rounded mt-36 bg-primary-500"
                type="button"
                onClick={openModal}>
                저장
              </button>
              <Modal isOpen={modalOpen} content="저장 하시겠습니까?" onClose={closeModal} onConfirm={handleSubmit} />
            </>
          )}
        </>
      ) : (
        <GetStaffsList
          setShowComponentForm={setShowComponentForm}
          setSelectedStaff={setSelectedStaff}
          setPrivateTutorId={setPrivateTutorId}
        />
      )}
    </>
  );
};
export default CreateIssuedTicket;
