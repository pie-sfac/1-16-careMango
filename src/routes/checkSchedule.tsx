import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/common/Card';
import Header from '../components/common/Header';
import { ScheduleItemData } from '../types/schedule';
import ScheduleBox from '../components/ScheduleBox';
import ScheduleDetail from '../components/ScheduleDetail';

const CheckSchedule = () => {
  const [itemData, setItemData] = useState<ScheduleItemData | null>();
  const { scheduleId } = useParams<{ scheduleId: string | undefined }>();
  const [attendanceHistoryId, setAttendanceHistoryId] = useState(0);
  const navigate = useNavigate();

  const fetchCheckSchedule = async () => {
    const res = await axios.get('http://localhost:5173/data/scheduleData.json');
    // const res = await axios.get(`schedules/private-lesson/${scheduleId}`);
    const scheduleData = res.data;
    setItemData(scheduleData);
    setAttendanceHistoryId(scheduleData.attendanceHistories[0].id);
  };

  const goEditSchedule = () => {
    navigate(`/schedule/edit/${scheduleId}`);
  };

  useEffect(() => {
    fetchCheckSchedule();
  }, []);

  if (!itemData) return <p>loading...</p>;
  return (
    <>
      <Header
        title="11시 서태지"
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
      <ScheduleBox itemData={itemData} />

      <section className="mt-20 base-font">
        <h2 className="small-title">참여회원(1)</h2>
        <div className="flex items-center">
          <Card>
            <ScheduleDetail
              itemData={itemData}
              fetchCheckSchedule={fetchCheckSchedule}
              attendanceHistoryId={attendanceHistoryId}
            />
          </Card>
        </div>
      </section>
    </>
  );
};
export default CheckSchedule;
