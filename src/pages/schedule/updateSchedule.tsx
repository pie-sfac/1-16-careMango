import { axiosInstance } from '@/utils/apiInstance';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import SubHeader from '@components/common/SubHeader/SubHeader';
import ScheduleUpdateForm from './components/ScheduleUpdateForm';

const ScheduleUpdatePage = () => {
  const { scheduleId } = useParams();

  const fetchCheckSchedule = async () => {
    const res = await axiosInstance.get(`schedules/private-lesson/${scheduleId}`);
    return res.data;
  };

  const { data: itemData, isLoading, isError } = useQuery(['schedule', scheduleId], fetchCheckSchedule);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error</p>;
  }
  return (
    <>
      <SubHeader title="일정 변경" />
      <div className="flex flex-col">
        <h1 className="main-title">개인수업</h1>
        <ScheduleUpdateForm itemData={itemData} isLoading={isLoading} isError={isError} />
      </div>
    </>
  );
};

export default ScheduleUpdatePage;
