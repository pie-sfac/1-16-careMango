import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { axiosInstance } from '../../utils/apiInstance';
import Card from '../../components/common/Card';
import Header from '../../components/common/SubHeader';
import { ScheduleItemData } from '../../types/schedule/schedule';
import ScheduleBox from '../../components/schedule/ScheduleBox';
import ScheduleDetail from '../../components/schedule/ScheduleDetail';
import { itemDataState } from '../../atoms/itemDataAtom';

const CheckSchedule = () => {
  const [itemData, setItemData] = useRecoilState(itemDataState);
  const { scheduleId } = useParams<{ scheduleId: string | undefined }>();
  const [attendanceHistoryId, setAttendanceHistoryId] = useState(0);
  const navigate = useNavigate();

  const fetchCheckSchedule = useCallback(async () => {
    const res = await axios.get('http://localhost:5173/data/scheduleData.json');
    // const res = await axiosInstance.get(`schedules/private-lesson/${scheduleId}`);
    const scheduleData = res.data;
    console.log(scheduleData);
    setItemData(scheduleData);
    setAttendanceHistoryId(scheduleData.attendanceHistories[0].id);
    // }, [scheduleId, setItemData]);
  }, [setItemData]);

  const goEditSchedule = () => {
    navigate(`/schedule/personal/edit/${scheduleId}`);
  };

  useEffect(() => {
    fetchCheckSchedule();
  }, [fetchCheckSchedule]);

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
