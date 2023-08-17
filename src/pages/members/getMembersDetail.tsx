import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import SubHeader from '@components/common/SubHeader/SubHeader';
import { ReactComponent as MoreVert } from '@/assets/icons/MoreVert.svg';
import { ReactComponent as Document } from '@/assets/icons/Document.svg';
import { ReactComponent as Message } from '@/assets/icons/Message.svg';
import { ReactComponent as Profile40 } from '@/assets/icons/Profile_40.svg';
import { ReactComponent as Edit } from '@/assets/icons/Edit.svg';
import MemberRecord from '@pages/members/components/MemberRecord';
import MemberReview from '@pages/members/components/MemberReview';
import MemberAlbum from '@pages/members/components/MemberAlbum';
import { MembersDetail } from '@/types/members/membersDetail';

type TabType = 'record' | 'review' | 'album';

const GetMembersDetail = () => {
  const [activeTab, setActiveTab] = useState<TabType>('record');
  const { memberId } = useParams<{ memberId: string | undefined }>();
  const navigate = useNavigate();

  const goMainMembers = () => {
    navigate(`/members/${memberId}/issued-tickets`);
  };

  const goUpdateMembers = () => {
    navigate(`/members/update/${memberId}`);
  };

  const [memberDetail, setMemberDetail] = useState<MembersDetail | null>(null);
  const getMemberDatail = async () => {
    const res = await axiosInstance.get(`members/${memberId}`);
    setMemberDetail(res.data);
  };

  useEffect(() => {
    getMemberDatail();
  }, []);

  const memberInformation = [
    { id: 1, label: '이름', value: memberDetail?.name },
    { id: 2, label: '생년월일', value: memberDetail?.birthDate },
    { id: 3, label: '등록일', value: memberDetail?.createdAt.split('T')[0] },
    { id: 4, label: '성별', value: memberDetail?.sex === 'MALE' ? '남' : '여' },
    { id: 5, label: '전화번호', value: memberDetail?.phone },
    { id: 6, label: '직업형태', value: memberDetail?.job },
  ];

  return (
    <>
      <SubHeader
        title="회원 정보"
        rightBtn={
          <button type="button">
            <MoreVert />
          </button>
        }
      />
      <div className="flex justify-between">
        <h1 className="main-title">회원 정보</h1>
        <div className="flex items-center">
          <button type="button" className="flex mr-4" onClick={goMainMembers}>
            수강권 / 계약서
            <Document />
          </button>
          <button type="button" className="flex">
            알림메시지 보내기
            <Message />
          </button>
        </div>
      </div>
      <section className="flex items-center justify-between p-4 border-2 rounded-xl ">
        <div className="flex items-center">
          <Profile40 />
          {memberInformation.map((info) => (
            <div key={info.id} className="flex">
              <p className="ml-5 text-text-400">{info.label}</p>
              <p className="ml-2">{info.value}</p>
            </div>
          ))}
        </div>
        <button type="button" onClick={goUpdateMembers}>
          <Edit />
        </button>
      </section>
      <section className="mt-8">
        <div className="flex border-b tabs border-line-300">
          <button
            type="button"
            className={`flex-1 py-2 px-4 ${activeTab === 'record' ? 'border-b-2 border-blue-500' : 'hover:bg-blue-50'}`}
            onClick={() => setActiveTab('record')}>
            기록지
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 ${activeTab === 'review' ? 'border-b-2 border-blue-500' : 'hover:bg-blue-50'}`}
            onClick={() => setActiveTab('review')}>
            만족도 및 후기
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 ${activeTab === 'album' ? 'border-b-2 border-blue-500' : 'hover:bg-blue-50'}`}
            onClick={() => setActiveTab('album')}>
            앨범
          </button>
        </div>

        {activeTab === 'record' && <MemberRecord />}
        {activeTab === 'review' && <MemberReview />}
        {activeTab === 'album' && <MemberAlbum />}
      </section>
    </>
  );
};

export default GetMembersDetail;
