import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cancelScheduleIdState } from '@/atoms/counseling/counselingScheduleAtom';
import { axiosInstance } from '@/utils/apiInstance';
import { CounselingDetail } from '@/types/counseling/counselingDetail';
import Card from '@components/common/Card';
import Modal from '@components/common/Modal/Modal';
import SubHeader from '@components/common/SubHeader/SubHeader';
import CounselingScheduleBox from '@pages/counseling/components/CounselingScheduleBox';
import CounselingScheduleDetail from '@pages/counseling/components/CounselingScheduleDetail';

const GetCounselingDetail = () => {
  const { scheduleId } = useParams<{ scheduleId: string | undefined }>();
  const [showModal, setShowModal] = useState(false);
  const [counselingData, setCounselingData] = useState<CounselingDetail | null>(null);
  const [cancelScheduleId, setCancelScheduleId] = useRecoilState(cancelScheduleIdState);
  const navigate = useNavigate();

  // API
  const getCounseling = async () => {
    const res = await axiosInstance.get(`schedules/counseling/${scheduleId}`);
    setCounselingData(res.data);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setCancelScheduleId(cancelScheduleId);
    setShowModal(false);
    navigate('/schedules');
  };

  useEffect(() => {
    getCounseling();
  }, []);

  const goUpdateCounseling = () => {
    navigate(`/schedules/counseling/update/${scheduleId}`);
  };

  const handleConfirmModal = async () => {
    try {
      const response = await axiosInstance.post(`schedules/${scheduleId}/cancel`, {});
      if (response.status === 200 || response.status === 201) {
        console.log('성공');
        handleCloseModal();
      }
    } catch (error) {
      console.error('실패', error);
    }
  };

  if (!counselingData) return <p>loading...</p>;
  return (
    <>
      <SubHeader
        title={`${counselingData.startAt.split('T')[1].split(':')[0]}시 ${
          counselingData.startAt.split('T')[1].split(':')[1]
        }분 상담`}
        rightBtn={
          <div>
            <button className="pl-5 text-base" type="button" onClick={goUpdateCounseling}>
              변경
            </button>
            <button className="pl-5 text-base" type="button" onClick={handleOpenModal}>
              취소
            </button>
          </div>
        }
      />

      {counselingData && <CounselingScheduleBox itemData={counselingData} />}

      <section className="mt-20 base-font">
        <h2 className="small-title">상담 회원</h2>
        <div className="flex items-center">
          <Card>{counselingData && <CounselingScheduleDetail itemData={counselingData} />}</Card>
        </div>
      </section>

      <section className="w-11/12 mt-10">
        <h2 className="small-title">일정 메모</h2>
        {counselingData.memo && (
          <div className="p-5 bg-white border border-line-200 rounded-xl">{counselingData.memo}</div>
        )}
      </section>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        width="w-6/12"
        content={
          <div className="flex flex-col items-center">
            <h1 className="mb-3 text-lg font-bold">상담 일정 취소</h1>
            <p>취소를 진행하시겠습니까?</p>
            <p>*주의: 일정 내용 복구 불가</p>
          </div>
        }
      />
    </>
  );
};
export default GetCounselingDetail;
