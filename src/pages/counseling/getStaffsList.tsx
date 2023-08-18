import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { axiosInstance } from '@/utils/apiInstance';
import { Staff } from '@/types/staffs/staffs';
import { ReactComponent as Back } from '@/assets/icons/Back.svg';
import { ReactComponent as Profile40 } from '@/assets/icons/Profile_40.svg';

interface GetStaffsListProps {
  setSelectedStaff: React.Dispatch<React.SetStateAction<Staff | null>>;
  setPrivateTutorId?: React.Dispatch<React.SetStateAction<number>>;
  setShowComponentForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const GetStaffsList = ({ setSelectedStaff, setPrivateTutorId, setShowComponentForm }: GetStaffsListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: staffsList } = useQuery('staffs', async () => {
    const res = await axiosInstance.get('staffs');
    return res.data.datas;
  });

  let displayedStaffs = staffsList || [];
  if (searchQuery) {
    displayedStaffs = displayedStaffs.filter(
      (data: Staff) => data.name.includes(searchQuery) || data.phone.includes(searchQuery),
    );
  }

  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);
  const handleStaffSelect = (staff: Staff) => {
    if (staff && staff.id) {
      setSelectedStaff(staff);
      if (setPrivateTutorId) {
        setPrivateTutorId(staff.id);
      }
      setShowComponentForm(true);
    }
  };

  return (
    <div>
      <header className="flex justify-between py-3 mb-3">
        <div className="flex">
          <button onClick={handleBackClick} type="button" className="mr-3 focus:outline-none">
            <Back />
          </button>
          <input
            type="text"
            placeholder='이름 또는 "-"를 제외한 연락처를 입력해주세요'
            value={searchQuery}
            className="flex px-4 py-2 rounded-lg outline-none w-96 bg-bg-100"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>
      <ul className="flex flex-col">
        {displayedStaffs && displayedStaffs.length > 0 ? (
          displayedStaffs.map((staffs: Staff) => (
            <button key={staffs.id} type="button" onClick={() => handleStaffSelect(staffs)}>
              {/* <button key={staffs.id} type="button" onClick={handleBackClick}> */}
              <div className="flex items-center justify-between my-1 base-font">
                <div className="flex my-2">
                  <Profile40 />
                  <p className="flex items-center px-2 ml-2 border rounded-md bg-bg-100 text-primary-300 ">강사</p>
                  <p className="flex items-center justify-center ml-4 font-bold">{staffs.name}</p>
                  <p className="flex items-center ml-32">{staffs.phone}</p>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div>강사가 없습니다.</div>
        )}
      </ul>
    </div>
  );
};

export default GetStaffsList;
