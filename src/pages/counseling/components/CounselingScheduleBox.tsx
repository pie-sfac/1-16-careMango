import React from 'react';
import { CounselingDetail } from '../../types/counseling/counselingDetail';
import { getDay, getTime } from '../../utils/date';

const CounselingScheduleBox = ({ itemData }: { itemData: CounselingDetail }) => (
  <section className="relative h-40 bg-bg-100">
    <div className="flex items-center justify-between py-4">
      <h1 className="main-title">상담</h1>
      <p className="text-xs text-text-400">
        생성일 {getDay(itemData.createdAt)} {getTime(itemData.createdAt)} {itemData.createdBy.name}
      </p>
    </div>

    <div className="absolute left-0 w-full top-24">
      <h2 className="small-title">수업 정보</h2>
      <div className="flex items-center justify-start h-16 p-6 gap-7 card-border base-font">
        <div className="flex gap-4">
          <p className="font-bold">일정</p>
          <p>{getDay(itemData.startAt)}</p>
        </div>
        <div className="flex gap-4">
          <p className="font-bold">시간</p>
          <p>
            {getTime(itemData.startAt)} ~ {getTime(itemData.endAt)}
          </p>
        </div>
        <div className="flex gap-4">
          <p className="font-bold">강사</p>
          <p>{itemData.counselor.name}</p>
        </div>
      </div>
    </div>
  </section>
);
export default CounselingScheduleBox;
