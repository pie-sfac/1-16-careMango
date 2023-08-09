import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import { Staff } from '@/types/staffs/staffs';
import StaffListItem from '@pages/staffs/components/StaffListItem';
import { ReactComponent as Search } from '@/assets/icons/Search.svg';

const ShowStaffs = () => {
  const [staffList, setStaffList] = useState<Staff[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getStaffs = async () => {
    const res = await axiosInstance.get('staffs');
    setStaffList(res.data.datas);
  };

  useEffect(() => {
    getStaffs();
  }, []);

  let displayedStaffs = staffList || [];
  if (searchQuery) {
    displayedStaffs = displayedStaffs.filter((data) => data.name.includes(searchQuery));
  }

  const navigate = useNavigate();
  const goCreateStaff = () => {
    navigate('/staffs/createStaff');
  };

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
      <div className="flex justify-between my-3 ">
        <div className="flex items-center justify-center">
          <h1 className="mr-2 font-bold">직원 리스트</h1>
          <p className="text-primary-500">{displayedStaffs?.length || 0}</p>
          <button type="button">등록일</button>
          <button type="button">이름순</button>
          <button type="button" onClick={goCreateStaff}>
            직원등록
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between p-3 my-1">
        <p>이름</p>
        <p>연락처</p>
        <p>총 회원수</p>
        <p>메모</p>
      </div>
      <ul className="flex flex-col">
        {displayedStaffs && displayedStaffs.length > 0 ? (
          displayedStaffs.map((staffs) => <StaffListItem key={staffs.id} staffs={staffs} />)
        ) : (
          <div>직원이 없습니다.</div>
        )}
      </ul>
    </div>
  );
};

export default ShowStaffs;
