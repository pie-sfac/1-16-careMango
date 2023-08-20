import SubHeader from '@components/common/SubHeader/SubHeader';
import ScheduleUpdateForm from './components/ScheduleUpdateForm';

const ScheduleUpdatePage = () => {
  return (
    <>
      <SubHeader title="일정 변경" />
      <div className="flex flex-col">
        <h1 className="main-title">개인수업</h1>
        <ScheduleUpdateForm />
      </div>
    </>
  );
};

export default ScheduleUpdatePage;
