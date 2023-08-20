import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import Modal from '@components/common/Modal/Modal';
import { axiosInstance } from '@/utils/apiInstance';
import { CounselingDetail } from '@/types/counseling/counselingDetail';
import { UpdateStateType } from '@/types/counseling/counseling';
import { ReactComponent as Profile24 } from '@/assets/icons/Profile_24.svg';
import { ReactComponent as Close } from '@/assets/icons/Close.svg';

interface CounselingScheduleDetailProps {
  itemData: CounselingDetail;
}
const btnClass = 'px-5 py-2 border border-line-200 rounded text-primary-300 active:bg-gray-200';

const CounselingScheduleDetail = ({ itemData }: CounselingScheduleDetailProps) => {
  const { id, client, memo, startAt, endAt } = itemData;
  const [counselingContent, setCounselingContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { scheduleId } = useParams<{ scheduleId: string | undefined }>();

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  const { data } = useQuery(
    ['counselingDetail', scheduleId],
    async () => {
      const response = await axiosInstance.get(`schedules/counseling/${scheduleId}`);
      return response.data;
    },
    {
      enabled: !!scheduleId,
      onSuccess: (data) => {
        if (data.counselingRecord && data.counselingRecord.content) {
          setCounselingContent(data.counselingRecord.content);
        }
      },
      onError: () => {
        console.error('상담 내용 로드 실패');
      },
    },
  );

  // 새로 입력된 상담 기록 데이터 api로 보내기
  const updateCounseling = useMutation(
    async (updateData: UpdateStateType) => {
      const response = await axiosInstance.put(`schedule/counseling/${scheduleId}`, updateData);
      return response.data;
    },
    {
      onSuccess: handleCloseModal,
      onError: () => console.error('실패'),
    },
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCounselingContent(e.target.value);
  };

  const handleConfirmModal = () => {
    const updateData: UpdateStateType = {
      userId: id,
      memberId: client.memberId,
      clientName: client.name,
      clientPhone: client.phone,
      memo,
      startAt,
      endAt,
      counselingRecordContent: counselingContent,
    };
    updateCounseling.mutate(updateData);
  };

  return (
    <>
      <div className="flex items-center p-5 border-b gap-28 border-line-200">
        <div className="flex gap-3">
          <Profile24 />
          <div className="flex flex-col">
            <p className="font-bold">{client.name}</p>
            <p>{client.phone}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button type="button" className={btnClass} onClick={handleOpenModal}>
            상담기록
          </button>
          <button
            type="button"
            className={btnClass}
            onClick={() => navigate('/members/new', { state: { register: true } })}>
            회원 정보 등록
          </button>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        width="w-6/12"
        isDisabled={counselingContent.trim().length === 0}
        content={
          <>
            <div className="flex justify-between mb-3">
              <h1 className="text-lg font-bold">상담기록</h1>
              <button type="button" onClick={handleCloseModal}>
                <Close />
              </button>
            </div>
            <p className="mb-3">회원님과 나눈 내용을 자유롭게 작성해 보세요.</p>
            <textarea
              className="w-full p-2 border rounded"
              placeholder="내용을 입력해 주세요. (1000자 이내)"
              value={counselingContent}
              onChange={handleChange}
            />
          </>
        }
      />
    </>
  );
};

export default CounselingScheduleDetail;
