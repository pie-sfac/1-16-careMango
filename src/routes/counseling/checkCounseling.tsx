import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiInstance';
import { CounselingDetail } from '../../types/counseling/counselingDetail';
import Card from '../../components/common/Card';
import SubHeader from '../../components/common/SubHeader';
// import { getDay, getTime } from '../../utils/date';
import CounselingScheduleBox from '../../components/counseling/CounselingScheduleBox';
import CounselingScheduleDetail from '../../components/counseling/CounselingScheduleDetail';

const CheckCounseling = () => {
  const { scheduleId } = useParams<{ scheduleId: string | undefined }>();
  const [counselingData, setCounselingData] = useState<CounselingDetail | null>(null);

  // API
  const getCounseling = async () => {
    const res = await axiosInstance.get(`schedules/counseling/${scheduleId}`);
    setCounselingData(res.data);
    // console.log(res.data);
  };

  useEffect(() => {
    getCounseling();
  }, []);

  if (!counselingData) return <p>loading...</p>;
  return (
    <>
      <SubHeader
        title={`${counselingData.startAt.split('T')[1].split(':')[0]}시 ${
          counselingData.startAt.split('T')[1].split(':')[1]
        }분 상담`}
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

      {counselingData && <CounselingScheduleBox itemData={counselingData} />}

      <section className="mt-20 base-font">
        <h2 className="small-title">상담 회원</h2>
        <div className="flex items-center">
          <Card>{counselingData && <CounselingScheduleDetail itemData={counselingData} />}</Card>
        </div>
      </section>

      <section className="w-11/12 mt-10">
        <h2 className="small-title">일정 메모</h2>
        {counselingData.memo && (
          <div className="p-5 bg-white border border-line-200 rounded-xl">{counselingData.memo}</div>
        )}
      </section>
    </>
  );
};
export default CheckCounseling;
