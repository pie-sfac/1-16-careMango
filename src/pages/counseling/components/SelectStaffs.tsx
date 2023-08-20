// import { useState } from 'react';
import { Staff } from '@/types/staffs/staffs';
import { ReactComponent as Profile24 } from '@/assets/icons/Profile_24.svg';
import { ReactComponent as Delete24 } from '@/assets/icons/Delete_24.svg';

interface SelectStaffsProps {
  selectedStaff: Staff | null;
  setSelectedStaff: React.Dispatch<React.SetStateAction<Staff | null>>;
  setPrivateTutorId?: React.Dispatch<React.SetStateAction<number>>;
  setUserId?: React.Dispatch<React.SetStateAction<number>>;
  setShowComponentForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectStaffs: React.FC<SelectStaffsProps> = ({
  selectedStaff,
  setSelectedStaff,
  setPrivateTutorId,
  setUserId,
  setShowComponentForm,
}) => {
  const handleClick = () => {
    if (setUserId) {
      setUserId(selectedStaff?.id || 0);
    }
    setShowComponentForm(false);
  };

  const clearSelectedStaff = () => {
    setSelectedStaff(null);
    setPrivateTutorId && setPrivateTutorId(0);
    setUserId && setUserId(0);
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
          className={`p-3 mr-4 border border-solid rounded-xl ${
            selectedStaff !== null
              ? 'bg-bg-100 border-bg-300 text-gray-300 cursor-not-allowed'
              : 'text-primary-300 border-primary-300 '
          }`}
          onClick={handleClick}
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
