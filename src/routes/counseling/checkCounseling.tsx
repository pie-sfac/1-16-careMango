import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiInstance';
import { CounselingDetail } from '../../types/counseling/counselingDetail';
import Card from '../../components/common/Card';
import SubHeader from '../../components/common/SubHeader';
import InputMemo from '../../components/common/InputMemo';
import CounselingScheduleBox from '../../components/counseling/CounselingScheduleBox';
import CounselingScheduleDetail from '../../components/counseling/CounselingScheduleDetail';

const CheckCounseling = () => {
  const [counselingData, setCounselingData] = useState<CounselingDetail[] | null>(null);
  const { scheduleId } = useParams<{ scheduleId: string | undefined }>();
  const navigate = useNavigate();

  const getCounseling = async () => {
    const res = await axiosInstance.get(`schedules/counseling/${scheduleId}`);
    setCounselingData(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getCounseling();
  }, []);

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

      <section className="mt-20 base-font">
        <h2 className="small-title">상담 회원</h2>
        <div className="flex items-center">
          <Card>{/* <CounselingScheduleDetail itemData={counselingData} /> */}</Card>
        </div>
      </section>

      <section className="w-11/12 mt-10">{/* <InputMemo title="일정 메모" /> */}</section>
    </>
  );
};
export default CheckCounseling;
