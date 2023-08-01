import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiInstance';
import { MembersData } from '../../types/members/members';
import NoMembers from '../../components/members/Nomembers';
import MembersItem from '../../components/members/MembersItem';

// test data
const membersData: MembersData[] = [
  {
    meta: {
      totalCount: 100,
      size: 1,
      count: 10,
      page: 2,
      hasMore: true,
    },
    datas: [
      {
        id: 0,
        name: 'yunie',
        phone: '010-1111-1111',
        sex: 'FEMALE',
        birthDate: '2023-01-01',
        createdAt: '2023-02-02',
        updatedAt: '2023-03-03',
        visitedAt: '2023-04-04',
      },
    ],
    message: 'string',
  },
];

const ShowMembers = () => {
  const [memberList, setMemberList] = useState<MembersData[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getMembers = useCallback(async () => {
    const res = await axiosInstance.get('members');
    setMemberList(res.data.members);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.refetch) {
      getMembers();
    }
  }, [location, getMembers]);

  // 검색
  let displayedMembers = memberList?.[0]?.datas || [];
  if (searchQuery) {
    displayedMembers = displayedMembers.filter((data) => data.name.includes(searchQuery));
  }

  // 등록하기 누르면 회원 생성 페이지로
  const goCreateMembers = () => {
    navigate('/members/createMembers');
  };

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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M13.4765 14.8907C12.4957 15.5892 11.2958 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10C16 11.2958 15.5892 12.4957 14.8907 13.4765L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L13.4765 14.8907ZM14.5 10C14.5 7.51472 12.4853 5.5 10 5.5C7.51472 5.5 5.5 7.51472 5.5 10C5.5 12.4853 7.51472 14.5 10 14.5C12.4853 14.5 14.5 12.4853 14.5 10Z"
              fill="#505050"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-between my-3 font-bold">
        <div className="flex items-center justify-center">
          <h1 className="mr-2">나의 회원</h1>
          <p>{displayedMembers?.length || 0}</p>
        </div>
        <button
          className="px-2 py-1 bg-white border-2 border-solid border-line-300 rounded-xl"
          type="button"
          onClick={goCreateMembers}>
          등록하기
        </button>
      </div>

      {/* 회원 목록 */}
      <ul>
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

export default ShowMembers;
