import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../../components/common/Card';
import SubHeader from '../../components/common/SubHeader';
import CounselingScheduleBox from '../../components/counseling/CounselingScheduleBox';
import InputMemo from '../../components/common/InputMemo';
import { CounselingScheduleItemData } from '../../types/counseling/counseling';
import CounselingScheduleDetail from '../../components/counseling/CounselingScheduleDetail';

const CheckCounseling = () => {
  const [itemData, setItemData] = useState<CounselingScheduleItemData | undefined>();
  const { counselingId } = useParams<{ counselingId: string | undefined }>();
  const navigate = useNavigate();

  const fetchCheckCounseling = async () => {
    const res = await axios.get('http://localhost:5173/data/counselingData.json');
    // const res = await axios.get(`schedules/counseling-lesson/${counselingId}`);
    const counselingData = res.data;
    console.log(counselingData);
    setItemData(counselingData);
  };

  const goEditSchedule = () => {
    navigate(`/schedule/counseling/edit/${counselingId}`);
  };

  useEffect(() => {
    fetchCheckCounseling();
  }, []);

  if (!itemData) return <p>loading...</p>;
  return (
    <>
      <SubHeader
        title="09시 05분 상담"
        rightBtn={
          <div>
            <button className="pl-5 text-base" type="button" onClick={() => goEditSchedule()}>
              변경
            </button>
            <button className="pl-5 text-base" type="button">
              취소
            </button>
          </div>
        }
      />

      <CounselingScheduleBox itemData={itemData} />

      <section className="mt-20 base-font">
        <h2 className="small-title">상담 회원</h2>
        <div className="flex items-center">
          <Card>
            <CounselingScheduleDetail itemData={itemData} />
          </Card>
        </div>
      </section>

      <section className="w-11/12 mt-10">
        <InputMemo title="일정 메모" />
      </section>
    </>
  );
};
export default CheckCounseling;
