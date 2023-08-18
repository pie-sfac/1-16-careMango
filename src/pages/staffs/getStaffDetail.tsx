import { useEffect, useState } from 'react';
import { ReactComponent as Profile40 } from '@/assets/icons/Profile_40.svg';
import { ReactComponent as Edit } from '@/assets/icons/Edit.svg';
import MembersItem from '@pages/members/components/MembersItem';
import { axiosInstance } from '@/utils/apiInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { StaffsDetail } from '@/types/staffs/staffsDetail';
import { Member } from '@/types/members/members';
import NoMemebers from '@pages/members/components/NoMembers';
import SubHeader from '@components/common/SubHeader/SubHeader';

const GetStaffDetailPage = () => {
  const [staffInfo, setStaffInfo] = useState<StaffsDetail | null>(null);
  const [teachingMembers, setTeachingMembers] = useState<Member[] | null>(null);
  const { staffId } = useParams<{ staffId: string | undefined }>();
  const navigate = useNavigate();

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
        <div>
          <h1 className="main-title">직원 정보</h1>
        </div>
        <div>
          <button className="mr-4">권한 설정</button>
          <button className="mr-4">비밀번호 초기화</button>
          <button>직원 퇴사 처리</button>
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
        <button>
          <Edit />
        </button>
      </div>
      <div className="mt-8">
        <div className="flex items-center">
          <h2>개인 수업 회원</h2>
          <p className="text-primary-500"></p>
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
    </>
  );
};

export default GetStaffDetailPage;
