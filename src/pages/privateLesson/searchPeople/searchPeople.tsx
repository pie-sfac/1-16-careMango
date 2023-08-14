import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Member } from '@/types/members/members';
import { axiosInstance } from '@/utils/apiInstance';
import PeopleListItem from '@pages/privateLesson/components/PeopleListItem';
import SubHeader from '@components/common/SubHeader';

const SearchPeople = () => {
  const [peopleList, setPeopleList] = useState<Member[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const key = location.state.value;

  // 회원목록 호출
  const getMembers = async () => {
    const res = await axiosInstance.get('members');
    setPeopleList(res.data.datas);
  };

  /// 직원목록 호출
  const getStaffs = async () => {
    const res = await axiosInstance.get('staffs');
    setPeopleList(res.data.datas);
  };

  useEffect(() => {
    if (key === 'staff') {
      getStaffs();
    } else {
      getMembers();
    }
  }, []);

  let displayedPeople = peopleList || [];
  if (searchQuery) {
    displayedPeople = displayedPeople.filter((data) => data.name.includes(searchQuery));
  }

  return (
    <div className="p-5 bg-bg-100">
      <SubHeader title="" />
      <input
        type="text"
        className="flex-grow px-4 py-3 mb-3 outline-none w-full"
        placeholder="검색어를 입력해주세요"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {displayedPeople && displayedPeople.length > 0 ? (
          displayedPeople.map((people) => <PeopleListItem key={people.id} people={people} />)
        ) : (
          <div>회원이 없습니다.</div>
        )}
      </ul>
    </div>
  );
};

export default SearchPeople;
