import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { axiosInstance } from '@/utils/apiInstance';
import { timeListState } from '@/atoms/counseling/counselingScheduleAtom';
import { SchedulApiData } from '@/types/scheduleApi';
import { CounselingDetail } from '@/types/counseling/counselingDetail';

const fetchSchedules = async (): Promise<SchedulApiData> => {
  const from = '2023-01-21';
  const to = '2023-12-31';
  let apiUrl = `schedules?from=${from}&to=${to}`;

  const res = await axiosInstance.get(apiUrl);
  return {
    ...res.data,
    counselingSchedules: res.data.counselingSchedules.filter((item: CounselingDetail) => !item.isCanceled),
  };
};

const ScheduleApi = () => {
  const { data: scheduleList, isLoading } = useQuery('schedules', fetchSchedules);
  const [timeList, setTimeList] = useRecoilState(timeListState);
  const navigate = useNavigate();

  const goCreateCounseling = () => {
    const timeListData = scheduleList?.counselingSchedules?.map((e) => [e.startAt, e.endAt]) || [];
    setTimeList(timeListData);
    navigate('counseling/new');
  };

  const goCheckSchedule = () => navigate('/schedule/personal/1');
  const goCreateSchedule = () => navigate('/schedule/personal/new');
  const goCheckCounseling = (scheduleId: number) => navigate(`counseling/${scheduleId}`);

  if (isLoading) return <div>loading...</div>;

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
