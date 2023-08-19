import { useEffect, useState } from 'react';
import { ReactComponent as Profile40 } from '@/assets/icons/Profile_40.svg';
import { ReactComponent as Edit } from '@/assets/icons/Edit.svg';
import MembersItem from '@pages/members/components/MembersItem';
import { axiosInstance } from '@/utils/apiInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { StaffsDetail, PrescriptionReview } from '@/types/staffs/staffsDetail';
import { Member } from '@/types/members/members';
import NoMemebers from '@pages/members/components/NoMembers';
import SubHeader from '@components/common/SubHeader/SubHeader';
import Modal from '@components/common/Modal/Modal';

const GetStaffDetailPage = () => {
  const [staffInfo, setStaffInfo] = useState<StaffsDetail | null>(null);
  const [teachingMembers, setTeachingMembers] = useState<Member[] | null>(null);
  const [reviews, setReviews] = useState<PrescriptionReview | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { staffId } = useParams<{ staffId: string | undefined }>();
  const navigate = useNavigate();

  const goUpdateStaff = () => navigate(`/staffs/updateInfo/${staffId}`);

  const handleConfirmModal = () => {
    resignStaff();
    navigate('/staffs');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onClickResign = () => {
    setShowModal(true);
  };

  const resignStaff = async () => {
    const res = await axiosInstance.post(`staffs/${staffId}/resign`);
    console.log(res);
  };

  const getStaffDetail = async () => {
    const res = await axiosInstance.get(`staffs/${staffId}`);
    setStaffInfo(res.data);
    setTeachingMembers(res.data.members);
  };

  useEffect(() => {
    getStaffDetail();
  }, []);

  return (
    <>
      <SubHeader title="직원 정보" />
      <div className="flex justify-between">
        <div className="flex">
          <h1 className="main-title">직원 정보</h1>
          <p>{staffInfo?.createdAt} 등록</p>
        </div>
        <div>
          <button className="mr-4">권한 설정</button>
          <button className="mr-4">비밀번호 초기화</button>
          <button onClick={onClickResign}>직원 퇴사 처리</button>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 border-2 rounded-xl">
        <div className="flex items-center">
          <Profile40 />
          <div className="flex">
            <p className="ml-5 text-primary-500">{staffInfo?.name}</p>
            <p className="ml-2">{staffInfo?.phone}</p>
            <p className="ml-2">{staffInfo?.loginId}</p>
            <p className="ml-2">{staffInfo?.active ? '재직중' : '퇴사'}</p>
          </div>
        </div>
        <button onClick={goUpdateStaff}>
          <Edit />
        </button>
      </div>
      <div className="mt-8">
        <div className="flex items-center">
          <h2 className="small-title">개인 수업 회원</h2>
          <p className="text-primary-500">{staffInfo?.members.length}</p>
        </div>
      </div>
      <div>
        <ul className="flex flex-col">
          {teachingMembers && teachingMembers.length > 0 ? (
            teachingMembers.map((member: Member) => <MembersItem key={member.id} members={member} />)
          ) : (
            <NoMemebers />
          )}
        </ul>
      </div>
      <div className="mt-8">
        <div className="flex items-center">
          <h2 className="small-title">만족도 및 후기</h2>
          <p className="text-primary-500">{staffInfo?.prescriptionReviews.length}</p>
        </div>
      </div>
      <div>
        <ul>
          {staffInfo?.prescriptionReviews && staffInfo.prescriptionReviews.length > 0 ? (
            staffInfo?.prescriptionReviews.map((review: PrescriptionReview) => <div>review.rating</div>)
          ) : (
            <NoMemebers />
          )}
        </ul>
      </div>
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        width="w-6/12"
        content={
          <div className="flex flex-col items-center">
            <p className="font-bold">{staffInfo?.name}님을</p>
            <p className="font-bold">퇴사 처리하시겠습니까?</p>
            <br />
            <p>퇴사 후, {staffInfo?.name}님의 정보는 조회만 가능합니다.</p>
          </div>
        }
      />
    </>
  );
};

export default GetStaffDetailPage;
