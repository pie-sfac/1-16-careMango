import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import SelectDate from '../components/common/SelectDate';
import SelectTime from '../components/common/SelectTime';
import Header from '../components/common/Header';
import { itemDataState } from '../atoms/itemDataAtom';
import axiosInstance from '../utils/apiInstance';
import { getDay, getTime } from '../utils/date';
import NameTag from '../components/common/NameTag';

const ChangeSchedule = () => {
  const [itemData, setItemData] = useRecoilState(itemDataState);
  console.log(itemData);

  return (
    <>
      <Header title="일정 변경" />
      <div className="flex flex-col">
        <h1 className="main-title">개인수업</h1>
        {/* 변경 일정 기본 데이터값 넣어주기 */}
        <SelectDate title="일자 선택" defaultState={getDay(itemData!.startAt)} />
        <SelectTime
          title="시간 선택"
          defaultState={{ startTime: getTime(itemData!.startAt), endTime: getTime(itemData!.endAt) }}
        />
        <div className="my-5">
          <h2 className="small-title m-b">참여 회원</h2>
          <NameTag name={itemData!.attendanceHistories[0].member.name} />
        </div>

        <div className="my-5">
          <h2 className="small-title">담당 강사</h2>
          <NameTag name={itemData!.tutor.name} />
        </div>

        <button className="py-3 my-5 text-white rounded bg-primary-500" type="submit">
          완료
        </button>
      </div>
    </>
  );
};

export default ChangeSchedule;
