import React, { useState } from 'react';
import axios from 'axios';
import { ScheduleItemData } from '../types/schedule/schedule';

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
