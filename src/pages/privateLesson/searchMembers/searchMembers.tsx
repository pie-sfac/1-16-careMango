import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Member } from '@/types/members/members';
import { axiosInstance } from '@/utils/apiInstance';
import MemberListItem from '@pages/privateLesson/components/MemberListItem';

const SearchMembers = () => {
  const [memberList, setMemberList] = useState<Member[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // 회원목록 호출
    const getMembers = async () => {
      const res = await axiosInstance.get('members');
      setMemberList(res.data.datas);
    };
    getMembers();
  }, []);

  let displayedMembers = memberList || [];
  if (searchQuery) {
    displayedMembers = displayedMembers.filter((data) => data.name.includes(searchQuery));
  }

  // 이전 페이지로
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <header className="flex justify-between py-3 mb-2 text-xl font-bold">
        <div className="flex">
          <button onClick={handleBackClick} type="submit" className="focus:outline-none">
            <svg
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none">
              <path
                d="M16.7071 3.29289C17.0976 3.68342 17.0976 4.31658 16.7071 4.70711L9.41421 12L16.7071 19.2929C17.0976 19.6834 17.0976 20.3166 16.7071 20.7071C16.3166 21.0976 15.6834 21.0976 15.2929 20.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L15.2929 3.29289C15.6834 2.90237 16.3166 2.90237 16.7071 3.29289Z"
                fill="#505050"
              />
            </svg>
          </button>
          <input
            type="text"
            className="flex-grow px-4 py-3 outline-none"
            placeholder="검색어를 입력해주세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>
      <ul>
        {displayedMembers && displayedMembers.length > 0 ? (
          displayedMembers.map((members) => <MemberListItem key={members.id} members={members} />)
        ) : (
          <div>회원이 없습니다.</div>
        )}
      </ul>
    </>
  );
};

export default SearchMembers;
