import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { axiosInstance } from '@/utils/apiInstance';
import Card from '@components/common/Card/Card';
import SubHeader from '@components/common/SubHeader/SubHeader';
import { ScheduleItemData } from '@/types/schedule/schedule';
import ScheduleBox from '@pages/schedule/components/ScheduleBox';
import ScheduleDetail from '@pages/schedule/components/ScheduleDetail';
import { itemDataState } from '@/atoms/schedule/itemDataAtom';
import Modal from '@components/common/Modal/Modal';

const ScheduleDetailPage = () => {
  const [itemData, setItemData] = useRecoilState(itemDataState);
  const { scheduleId } = useParams<{ scheduleId: string | undefined }>();
  const [attendanceHistoryId, setAttendanceHistoryId] = useState(0);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
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

  const openCancelModal = () => {
    setCancelModalOpen(true);
  };
  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };

  const handleConfirmCancel = async () => {
    console.log('일정 취소');
    const res = await axiosInstance.post(`/schedules/${scheduleId}/cancel`);
    console.log(res.data);
  };

  useEffect(() => {
    fetchCheckSchedule();
  }, [fetchCheckSchedule]);

  if (!itemData) return <p>loading...</p>;
  return (
    <>
      <SubHeader
        title="11시 서태지"
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
export default ScheduleDetailPage;
