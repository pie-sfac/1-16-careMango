import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import MoreVert from '../../assets/icons/MoreVert.svg';
import Document from '../../assets/icons/Document.svg';
import Message from '../../assets/icons/Message.svg';
import Filter from '../../assets/icons/Filter.svg';
import MemberInfomation from '../../components/members/MemberInfomation';
import MemberRecord from '../../components/members/MemberRecord';
import MemberReview from '../../components/members/MemberReview';
import MemberAlbum from '../../components/members/MemberAlbum';

type TabType = 'record' | 'review' | 'album';

const MemberInfo = () => {
  // 이용중인 수강권 보는 페이지로
  const navigate = useNavigate();
  const goMainMembers = () => {
    // console.log(state);
    navigate('/tickets/useTickets');
  };

  const [activeTab, setActiveTab] = useState<TabType>('record');

  return (
    <>
      <Header
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
            퍼스널 레포트 보내기
            <Message />
          </button>
        </div>
      </div>
      <MemberInfomation />
      <section className="mt-8">
        <div className="tabs flex border-b border-line-300">
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

export default MemberInfo;
