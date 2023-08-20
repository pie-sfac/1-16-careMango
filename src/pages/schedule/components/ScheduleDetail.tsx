import { useState } from 'react';
import { ScheduleItemData } from '@/types/schedule/schedule';
import { ReactComponent as Profile } from '@/assets/icons/Profile_24.svg';
import Modal from '@components/common/Modal/Modal';
import { axiosInstance } from '@/utils/apiInstance';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

interface ScheduleDetailProps {
  itemData: ScheduleItemData;
  attendanceHistoryId: number;
}

const ScheduleDetail = ({ itemData, attendanceHistoryId }: ScheduleDetailProps) => {
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [absenceModalOpen, setAbsenceModalOpen] = useState(false);
  const { scheduleId } = useParams();
  const queryClient = useQueryClient();

  const openAttendanceModal = () => {
    setAttendanceModalOpen(true);
  };
  const closeAttendanceModal = () => {
    setAttendanceModalOpen(false);
  };

  const openAbsenceModal = () => {
    setAbsenceModalOpen(true);
  };
  const closeAbsenceModal = () => {
    setAbsenceModalOpen(false);
  };

  const attendanceMutation = useMutation(
    async (attendanceHistoryId: number) => {
      await axiosInstance.post(`/attendance-histories/${attendanceHistoryId}/check-present`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['schedule', scheduleId]);
      },
    },
  );
  const handleConfirmAttendance = () => {
    attendanceMutation.mutate(attendanceHistoryId);
  };

  const absenceMutation = useMutation(
    async (attendanceHistoryId: number) => {
      await axiosInstance.post(`/attendance-histories/${attendanceHistoryId}/check-absent`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['schedule', scheduleId]);
      },
    },
  );
  const handleConfirmAbsence = async () => {
    absenceMutation.mutate(attendanceHistoryId);
  };

  const attendanceStatus = (status: string) => {
    if (status === 'PRESENT') {
      return '출석';
    }
    if (status === 'ABSENT') {
      return '결석';
    }
    return '예약';
  };

  const statusColorClass = () => {
    const status = itemData.attendanceHistories[0].status;
    if (status === 'PRESENT') {
      return 'text-primary-500';
    }
    if (status === 'ABSENT') {
      return 'text-red-500';
    }
    if (status === 'WAIT') {
      return 'text-text-900';
    }
  };

  return (
    <>
      <div className="flex items-center p-5 border-b gap-28 border-line-200">
        <div className="flex gap-3">
          <Profile />

          <div className="flex flex-col">
            <p className="font-bold">{itemData.attendanceHistories[0].member.name}</p>
            <p>{itemData.attendanceHistories[0].member.phone}</p>
          </div>
        </div>
        <div className="flex gap-1">
          {itemData.attendanceHistories[0].status === 'PRESENT' ? (
            <button type="button" className="text-white attendance-btn bg-primary-500" onClick={openAttendanceModal}>
              출석
            </button>
          ) : (
            <button type="button" className="attendance-btn" onClick={openAttendanceModal}>
              출석
            </button>
          )}
          <Modal
            isOpen={attendanceModalOpen}
            content="출석처리 하시겠습니까?"
            onClose={closeAttendanceModal}
            onConfirm={handleConfirmAttendance}
          />
          {itemData.attendanceHistories[0].status === 'ABSENT' ? (
            <button type="button" className="text-white attendance-btn bg-erro" onClick={openAbsenceModal}>
              결석
            </button>
          ) : (
            <button type="button" className="attendance-btn" onClick={openAbsenceModal}>
              결석
            </button>
          )}
          <Modal
            isOpen={absenceModalOpen}
            content="결석처리 하시겠습니까?"
            onClose={closeAbsenceModal}
            onConfirm={handleConfirmAbsence}
          />
        </div>
      </div>
      <div className="flex gap-8 py-5 px-14">
        <ul className="flex flex-col gap-2">
          <li>출결상태</li>
          <li>수강권</li>
          <li>잔여</li>
          <li>예약 가능</li>
        </ul>
        <ul className="flex flex-col gap-2 font-bold">
          <li className={statusColorClass()}>{attendanceStatus(itemData.attendanceHistories[0].status)}</li>
          <li>{itemData.issuedTicket.title}</li>
          <li>
            {itemData.issuedTicket.remainingCount}회 (총 {itemData.issuedTicket.defaultCount}회)
          </li>
          <li>
            {itemData.issuedTicket.availableReservationCount}회 (총 {itemData.issuedTicket.defaultCount}회)
          </li>
        </ul>
      </div>
      <div className="mb-6 px-14">
        <button
          type="button"
          className="inline-flex px-3 py-2 mr-2 text-xs border text-primary-300 border-line-200 rounded-xl">
          기록 작성하기
        </button>
        <button
          type="button"
          className="inline-flex px-3 py-2 text-xs border text-primary-300 border-line-200 rounded-xl">
          퍼스널 레포트 보내기
        </button>
      </div>
    </>
  );
};
export default ScheduleDetail;
