import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiInstance';
import { CounselingDetail } from '../../types/counseling/counselingDetail';
import Card from '../../components/common/Card';
import SubHeader from '../../components/common/SubHeader';
import InputMemo from '../../components/common/InputMemo';
import { getDay, getTime } from '../../utils/date';
import CounselingScheduleBox from '../../components/counseling/CounselingScheduleBox';
import CounselingScheduleDetail from '../../components/counseling/CounselingScheduleDetail';

const CheckCounseling = () => {
  // const { scheduleId } = useParams<{ scheduleId: string | undefined }>();
  const scheduleId = '174';
  const [counselingData, setCounselingData] = useState<CounselingDetail[] | null>(null);

  const getCounseling = async () => {
    const res = await axiosInstance.get(`schedules/counseling/${scheduleId}`);
    setCounselingData(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getCounseling();
  }, []);

  const [memo, setMemo] = useState<string>('');
  const onChange = (name: string, value: string) => {
    if (name === 'memo') {
      setMemo(value);
    }
  };

  // console.log(counselingData.createdAt);
  // const navigate = useNavigate();
  // const goEditSchedule = () => {
  //   navigate(`/schedule/counseling/edit/${counselingId}`);
  // };

  // if (!data) return <p>loading...</p>;
  return (
    <>
      <SubHeader
        title="09시 05분 상담"
        rightBtn={
          <div>
            <button className="pl-5 text-base" type="button">
              변경
            </button>
            <button className="pl-5 text-base" type="button">
              취소
            </button>
          </div>
        }
      />

      {/* <CounselingScheduleBox itemData={counselingData} /> */}
      {/* <section className="relative h-40 bg-bg-100">
        <div className="flex items-center justify-between py-4">
          <h1 className="main-title">상담</h1>
          <p className="text-xs text-text-400">
            생성일 {getDay(counselingData.createdAt)} {getTime(counselingData.createdAt)}{' '}
            {counselingData.createdBy.name}
          </p>
        </div>

        <div className="absolute left-0 w-full top-24">
          <h2 className="small-title">수업 정보</h2>
          <div className="flex items-center justify-start h-16 p-6 gap-7 card-border base-font">
            <div className="flex gap-4">
              <p className="font-bold">일정</p>
              <p>{getDay(counselingData.startAt)}</p>
            </div>
            <div className="flex gap-4">
              <p className="font-bold">시간</p>
              <p>
                {getTime(counselingData.startAt)} ~ {getTime(counselingData.endAt)}
              </p>
            </div>
            <div className="flex gap-4">
              <p className="font-bold">강사</p>
              <p>{counselingData.counselor.name}</p>
            </div>
          </div>
        </div>
      </section> */}

      <section className="mt-20 base-font">
        <h2 className="small-title">상담 회원</h2>
        <div className="flex items-center">
          <Card>
            <CounselingScheduleDetail itemData={counselingData} />
          </Card>
        </div>
      </section>

      <section className="w-11/12 mt-10">
        <InputMemo title="일정 메모" onChange={(value) => onChange('memo', value)} />
      </section>
    </>
  );
};
export default CheckCounseling;
