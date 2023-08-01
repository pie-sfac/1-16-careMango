import React, { useState } from 'react';
import axios from 'axios';
import { ScheduleItemData } from '../../types/schedule/schedule';
import { ReactComponent as Profile } from '../../assets/icons/Profile.svg';

interface ScheduleDetailProps {
  itemData: ScheduleItemData;
  fetchCheckSchedule: () => Promise<void>;
  attendanceHistoryId: number;
}

const ScheduleDetail = ({ itemData, fetchCheckSchedule, attendanceHistoryId }: ScheduleDetailProps) => {
  const onClickPresent = () => {
    axios.post(`/attendance-histories/${attendanceHistoryId}/check-present`);
    const isConfirmed = window.confirm('출석처리를 진행하시겠습니까?');
    if (isConfirmed) {
      alert('출석 처리되었습니다.');
      fetchCheckSchedule();
    }
  };

  const onClickAbsent = () => {
    axios.post(`/attendance-histories/${attendanceHistoryId}/check-absent`);
    const isConfirmed = window.confirm('결석처리를 진행하시겠습니까?');
    if (isConfirmed) {
      alert('결석 처리되었습니다.');
      fetchCheckSchedule();
    }
  };

  const attendanceStatus = (status: string) => {
    if (status === 'PRESENT') {
      return '출석';
    }
    if (status === 'ABSENT') {
      return '결석';
    }
    return '예약';
  };

  return (
    <>
      <div className="flex items-center p-5 border-b gap-28 border-line-200">
        <div className="flex gap-3">
          <Profile />

          <div className="flex flex-col">
            <p className="font-bold">{itemData.attendanceHistories[0].member.name}</p>
            <p>{itemData.attendanceHistories[0].member.phone}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button type="button" className="attendance-btn" onClick={onClickPresent}>
            출석
          </button>
          <button type="button" className="attendance-btn" onClick={onClickAbsent}>
            결석
          </button>
        </div>
      </div>
      <div className="flex gap-8 py-5 px-14">
        <ul className="flex flex-col gap-2">
          <li>출결상태</li>
          <li>수강권</li>
          <li>잔여</li>
          <li>예약 가능</li>
        </ul>
        <ul className="flex flex-col gap-2 font-bold">
          <li>{attendanceStatus(itemData.attendanceHistories[0].status)}</li>
          <li>{itemData.issuedTicket.title}</li>
          <li>
            {itemData.issuedTicket.remainingCount}회 (총 {itemData.issuedTicket.defaultCount}회)
          </li>
          <li>
            {itemData.issuedTicket.availableReservationCount}회 (총 {itemData.issuedTicket.defaultCount}회)
          </li>
        </ul>
      </div>
      <div className="mb-6 px-14">
        <button
          type="button"
          className="inline-flex px-3 py-2 mr-2 text-xs border text-primary-300 border-line-200 rounded-xl">
          기록 작성하기
        </button>
        <button
          type="button"
          className="inline-flex px-3 py-2 text-xs border text-primary-300 border-line-200 rounded-xl">
          퍼스널 레포트 보내기
        </button>
      </div>
    </>
  );
};
export default ScheduleDetail;
