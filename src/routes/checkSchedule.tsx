import React, { useEffect, useState } from 'react';
import Card from '../components/common/Card';

interface scheduleItemData {
  id: number;
  tutor: { id: number; name: string };
  lessonId: number;
  maxGroupMember: number;
  startAt: string;
  endAt: string;
  memo: string;
  issuedTicket: {
    id: number;
    lessonType: 'SINGLE' | 'DUET' | 'TRIPLE' | 'GROUP';
    title: string;
    startAt: string;
    endAt: string;
    remainingCount: number;
    defaultCount: number;
    serviceCount: number;
    availableReservationCount: number;
    defaultTerm: number;
    defaultTermUnit: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
    isSuspended: boolean;
    suspendedAt: string;
    isCanceled: boolean;
    canceledAt: string;
    createdAt: string;
    updatedAt: string;
  };
  attendanceHistories: [
    {
      id: number;
      member: {
        id: number;
        name: string;
        phone: string;
      };
      status: 'WAIT' | 'PRESENT' | 'ABSENT';
    },
  ];
  createdAt: string;
  createdBy: {
    id: number;
    name: string;
  };
  updatedAt: string;
  updatedBy: {
    id: number;
    name: string;
  };
}

const CheckSchedule = () => {
  const [itemData, setItemData] = useState<scheduleItemData | null>();

  useEffect(() => {
    fetch('http://localhost:5173/data/scheduleData.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setItemData(data);
      });
  }, []);

  if (!itemData) return <p>loading...</p>;
  return (
    <>
      {console.log(itemData)}
      <header className="flex justify-between py-3">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M16.7071 3.29289C17.0976 3.68342 17.0976 4.31658 16.7071 4.70711L9.41421 12L16.7071 19.2929C17.0976 19.6834 17.0976 20.3166 16.7071 20.7071C16.3166 21.0976 15.6834 21.0976 15.2929 20.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L15.2929 3.29289C15.6834 2.90237 16.3166 2.90237 16.7071 3.29289Z"
              fill="#505050"
            />
          </svg>
          <p className="text-base">11시 서태지</p>
        </div>
        <div>
          <button className="pl-5 text-base" type="button">
            변경
          </button>
          <button className="pl-5 text-base" type="button">
            취소
          </button>
        </div>
      </header>
      <section className="relative h-40 bg-bg-100">
        <div className="flex items-center justify-between py-4">
          <h1 className="main-title">개인수업일정</h1>
          <p className="text-xs text-text-400">생성일 2022년 12월 09일 (금) 13시 30분 김파이</p>
        </div>

        <div className="absolute left-0 w-full top-24">
          <h2 className="small-title">수업 정보</h2>
          <div className="flex items-center justify-start h-16 p-6 gap-7 card-border base-font">
            <div className="flex gap-4">
              <p className="font-bold">일정</p>
              <p>2022.12.23 (금)</p>
            </div>
            <div className="flex gap-4">
              <p className="font-bold">시간</p>
              <p>16:30 ~ 17:30</p>
            </div>
            <div className="flex gap-4">
              <p className="font-bold">정원</p>
              <p>{itemData.maxGroupMember}명</p>
            </div>
            <div className="flex gap-4">
              <p className="font-bold">강사</p>
              <p>{itemData.tutor.name}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 base-font">
        <h2 className="small-title">참여회원(1)</h2>
        <div className="flex items-center">
          <Card>
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
                <button type="button" className="attendance-btn">
                  출석
                </button>
                <button type="button" className="attendance-btn">
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
                <li>{itemData.attendanceHistories[0].status === 'WAIT' ? '예약' : '출석/결석'}</li>
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
          </Card>
        </div>
      </section>
    </>
  );
};
export default CheckSchedule;
