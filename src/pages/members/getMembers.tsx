import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import { Member } from '@/types/members/members';
import NoMembers from '@pages/members/components/NoMembers';
import MembersItem from '@pages/members/components/MembersItem';
import RegisterMembers from '@pages/members/registerMembers';
import CreateMembers from '@pages/members/createMembers';
import { ReactComponent as Search } from '@/assets/icons/Search.svg';

const GetMembers = () => {
  const [memberList, setMemberList] = useState<Member[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const getMembers = async () => {
    const res = await axiosInstance.get('members');
    setMemberList(res.data.datas);
    console.log(res.data.datas);
  };

  useEffect(() => {
    getMembers();
  }, []);

  // 검색 (이름 or 전화번호)
  let displayedMembers = memberList || [];
  if (searchQuery) {
    displayedMembers = displayedMembers.filter(
      (data) => data.name.includes(searchQuery) || data.phone.includes(searchQuery),
    );
  }

  // 등록하기 누르면 회원 등록 화면으로 전환
  const navigate = useNavigate();
  const location = useLocation();
  const isRegistering = location.state?.register || false;

  if (isRegistering) {
    return <CreateMembers onRegisterd={() => setIsRegister(true)} />;
  }

  if (isRegister) {
    return <RegisterMembers onExit={() => setIsRegister(false)} />;
  }

  return (
    <div className="p-5 bg-bg-100">
      {/* 검색 */}
      <div className="flex w-1/3 overflow-hidden bg-white border rounded-xl">
        <input
          type="text"
          placeholder="회원/멤버 이름, 연락처로 검색하세요"
          value={searchQuery}
          className="flex-grow px-4 py-3 outline-none"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center justify-center p-2">
          <Search />
        </div>
      </div>

      <div className="flex justify-between my-3 font-bold">
        <div className="flex items-center justify-center">
          <h1 className="mr-2">전체 회원</h1>
          <p className="text-primary-500">{displayedMembers?.length || 0}</p>
        </div>
        <button
          className="px-2 py-1 bg-white border-2 border-solid border-line-300 rounded-xl"
          type="button"
          onClick={() => navigate('/members', { state: { register: true } })}>
          등록하기
        </button>
      </div>

      {/* 회원 목록 */}
      <ul className="flex flex-col">
        {/* 등록된 회원이 있는 경우 */}
        {displayedMembers && displayedMembers.length > 0 ? (
          displayedMembers.map((members) => <MembersItem key={members.id} members={members} />)
        ) : (
          // 등록된 회원이 없는 경우
          <NoMembers />
        )}
      </ul>
    </div>
  );
};

export default GetMembers;
