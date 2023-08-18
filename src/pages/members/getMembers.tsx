import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import { Member } from '@/types/members/members';
import NoMembers from '@pages/members/components/NoMembers';
import MembersItem from '@pages/members/components/MembersItem';
import { ReactComponent as Search } from '@/assets/icons/Search.svg';

const GetMembers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    ['members', currentPage],
    async () => {
      const res = await axiosInstance.get('members', {
        params: {
          page: currentPage,
          size: membersPerPage,
          sort: 'createdAt,Asc',
        },
      });
      return res.data;
    },
    {
      keepPreviousData: true,
    },
  );
  const displayedMembers = searchQuery
    ? data?.datas.filter((member: Member) => member.name.includes(searchQuery) || member.phone.includes(searchQuery))
    : data?.datas || [];

  const totalPages = Math.ceil(data?.meta.totalCount / membersPerPage);

  const goCreateMembers = () => {
    navigate('/members/new');
  };

  if (isLoading) return <div>loading...</div>;
  return (
    <div className="p-5 bg-bg-100">
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
          <h1 className="mr-2">나의 회원</h1>
          <p className="text-primary-500">{data?.meta.totalCount}</p>
        </div>
        <button
          className="px-2 py-1 bg-white border-2 border-solid border-line-300 rounded-xl"
          type="button"
          onClick={goCreateMembers}>
          등록하기
        </button>
      </div>

      <ul className="flex flex-col">
        {displayedMembers && displayedMembers.length > 0 ? (
          displayedMembers.map((member: Member) => <MembersItem key={member.id} members={member} />)
        ) : (
          <NoMembers />
        )}
      </ul>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 m-2 rounded ${currentPage === index + 1 ? 'bg-primary-500 text-white' : 'bg-white'}`}
            onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GetMembers;
