import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import membersData from '../../../../public/data/membersData.json';
import { axiosInstance } from '../../../utils/apiInstance';
import { useRecoilState } from 'recoil';
import { searchQueryState } from '../../../atoms/members/membersAtom';
import MemberListItem from './MemberListItem';

const SearchMembers = () => {
  // input에 입력된 문자열 state
  const [memberInput, setMemberInput] = useState('');
  // 검색된 결과를 담을 state
  const [memberList, setMemberList] = useState(membersData.datas);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);

  // 회원목록 호출
  const getMembers = async () => {
    const res = await axiosInstance.get('members');
    setMemberList(res.data.members);
    return memberList;
  };

  useEffect(() => {
    getMembers();
  }, []);

  // 이전 페이지로
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const searched = memberList.filter((item: any) => {
    return item.name.includes(memberInput);
  });

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
        {searched.map((member: any) => (
          <MemberListItem member={member} />
        ))}
      </ul>
    </>
  );
};

export default SearchMembers;
