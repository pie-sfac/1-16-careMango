import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/common/MainHeader';
import { axiosInstance } from '../../utils/apiInstance';
import { Staff } from '../../types/staffs/staffs';
import StaffListItem from '../../components/staff/StaffListItem';

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

  return (
    <div>
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
