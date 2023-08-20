import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Card from '@components/common/Card/Card';
import SubHeader from '@components/common/SubHeader/SubHeader';
import ScheduleBox from '@pages/schedule/components/ScheduleBox';
import ScheduleDetail from './components/ScheduleDetail';
import Modal from '@components/common/Modal/Modal';
import { getTime } from '@/utils/date';

const ScheduleDetailPage = () => {
  const { scheduleId } = useParams<{ scheduleId: string | undefined }>();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const goEditSchedule = () => {
    navigate(`/schedule/personal/edit/${scheduleId}`);
  };

  const openCancelModal = () => {
    setCancelModalOpen(true);
  };
  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };

  const cancelScheduleMutation = useMutation(
    async (scheduleId: string) => {
      await axiosInstance.post(`/schedules/${scheduleId}/cancel`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['schedule', scheduleId]);
      },
    },
  );
  const handleConfirmCancel = () => {
    scheduleId && cancelScheduleMutation.mutate(scheduleId);
  };

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

  const attendanceHistoryId = itemData.attendanceHistories[0].id;

  return (
    <>
      <SubHeader
        title={`${getTime(itemData.startAt).split(':')[0]}시 ${getTime(itemData.startAt).split(':')[1]}분 ${
          itemData.attendanceHistories[0].member.name
        }`}
        rightBtn={
          <div>
            <button className="pl-5 text-base" type="button" onClick={() => goEditSchedule()}>
              변경
            </button>
            <button className="pl-5 text-base" type="button" onClick={openCancelModal}>
              취소
            </button>
            <Modal
              isOpen={cancelModalOpen}
              content="해당 일정을 취소하시겠습니까?"
              onClose={closeCancelModal}
              onConfirm={handleConfirmCancel}
            />
          </div>
        }
      />

      <ScheduleBox itemData={itemData} />

      <section className="mt-20 base-font">
        <h2 className="small-title">참여회원</h2>
        <div className="flex items-center">
          <Card>
            <ScheduleDetail itemData={itemData} attendanceHistoryId={attendanceHistoryId} />
          </Card>
        </div>
      </section>
    </>
  );
};
export default ScheduleDetailPage;
