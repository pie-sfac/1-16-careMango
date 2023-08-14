import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import { SchedulApiData } from '@/types/scheduleApi';
import { CounselingDetail } from '@/types/counseling/counselingDetail';

const ScheduleApi = () => {
  const [scheduleList, setScheduleList] = useState<SchedulApiData | null>(null);

  const getScheduleApi = async () => {
    const from = '2023-01-21';
    const to = '2023-12-31';
    let apiUrl = `schedules?from=${from}&to=${to}`;

    const res = await axiosInstance.get(apiUrl);
    console.log(res.data.counselingSchedules);

    const filteredCounselingSchedules = res.data.counselingSchedules.filter(
      (item: CounselingDetail) => !item.isCanceled,
    );

    setScheduleList({
      ...res.data,
      counselingSchedules: filteredCounselingSchedules,
    });
  };

  useEffect(() => {
    getScheduleApi();
  }, []);

  const navigate = useNavigate();
  const goCreateCounseling = () => {
    navigate('counseling/new');
  };

  const goCheckSchedule = () => {
    navigate('/schedule/personal/1');
  };

  const goCreateSchedule = () => {
    navigate('/schedule/personal/new');
  };

  const goCheckCounseling = (scheduleId: number) => {
    navigate(`counseling/${scheduleId}`);
  };

  return (
    <div className="flex flex-col">
      <button type="button" className="w-20 m-3 border-8" onClick={goCreateSchedule}>
        개인 수업 일정 생성
      </button>
      <button type="button" className="w-20 m-3 border-8" onClick={goCheckSchedule}>
        개인 수업 일정 조회(mock 데이터)
      </button>
      <button type="button" className="w-20 m-3 border-8" onClick={goCreateCounseling}>
        상담 일정 생성
      </button>

      <p>개인 수업 일정</p>
      {scheduleList?.privateSchedules.map((privateSchedule) => (
        <button key={privateSchedule.id} type="button">
          <div className="flex">
            <p>
              {privateSchedule.startAt.split('T')[1]}~{privateSchedule.endAt.split('T')[1]}
            </p>
            <p>{privateSchedule.memo}</p>
          </div>
        </button>
      ))}

      <p>상담 일정</p>
      {scheduleList?.counselingSchedules.map((counseling) => (
        <button key={counseling.id} type="button" onClick={() => goCheckCounseling(counseling.id)}>
          <div className="flex">
            <p>
              {counseling.startAt.split('T')[1]}~{counseling.endAt.split('T')[1]}
            </p>
            <p>{counseling.client.name}</p>
            <p>{counseling.memo}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ScheduleApi;
