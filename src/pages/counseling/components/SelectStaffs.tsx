import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StateType } from '@/types/counseling/counseling';
import { Staff } from '@/types/staffs/staffs';
import { ReactComponent as Profile24 } from '@/assets/icons/Profile_24.svg';
import { ReactComponent as Delete24 } from '@/assets/icons/Delete_24.svg';
import { useNavigate } from 'react-router-dom';

interface SelectStaffsProps {
  selectedStaff: Staff | null;
  setSelectedStaff: React.Dispatch<React.SetStateAction<Staff | null>>;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
}

const SelectStaffs: React.FC<SelectStaffsProps> = ({ selectedStaff, setSelectedStaff, setState }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocationState = location.state as StateType | undefined;

  useEffect(() => {
    if (currentLocationState && currentLocationState.selectedStaff) {
      setSelectedStaff(currentLocationState.selectedStaff);
      setState((prev) => ({ ...prev, ...currentLocationState }));
    }
  }, [currentLocationState, setSelectedStaff, setState]);

  const goStaffList = () => navigate('/schedules/counseling/new/staffs');

  const clearSelectedStaff = () => {
    setSelectedStaff(null);
    setState((prev) => ({ ...prev, userId: 0 }));
  };

  return (
    <>
      <div className="flex mt-10 mb-2">
        <p>담당 강사 선택</p>
        <p className="text-primary-300">*</p>
      </div>
      <div className="flex">
        <button
          type="button"
          className={`p-3 mr-4 border border-solid rounded-xl text-primary-300 border-primary-300 ${
            selectedStaff !== null ? 'bg-bg-100 border-bg-300 text-gray-300 cursor-not-allowed' : ''
          }`}
          onClick={goStaffList}
          disabled={selectedStaff !== null}>
          선택하기 +
        </button>
        {selectedStaff && (
          <div className="flex items-center justify-between w-40 p-3 border border-solid rounded-xl">
            <Profile24 />
            <span className="mr-5">{selectedStaff.name}</span>
            <button type="button" onClick={clearSelectedStaff} className="">
              <Delete24 />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectStaffs;
