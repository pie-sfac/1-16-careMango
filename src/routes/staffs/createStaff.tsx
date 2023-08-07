import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiInstance';
import SubHeader from '../../components/common/SubHeader';
import StaffRegFirst from '../../components/staffs/createStaff/registerStep/StaffRegFirst';
import StaffRegSecond from '../../components/staffs/createStaff/registerStep/StaffRegSecond';
import StaffRegThird from '../../components/staffs/createStaff/registerStep/StaffRegThird';
import InputName from '../../components/common/InputName';
import InputContact from '../../components/common/InputContact';
import InputPw from '../../components/common/InputPw';

interface StaffRegType {
  loginId: string;
  password: string;
  name: string;
  phone: string;
  roles: number[];
}

const initialState: StaffRegType = {
  loginId: '',
  password: '',
  name: '',
  phone: '',
  roles: [0],
};

interface CreateStaffProps {
  onRegistered: () => void;
}

const CreateStaff = ({ onRegistered }: CreateStaffProps) => {
  const [inputInfo, setInputInfo] = useState<StaffRegType>(initialState);
  const navigate = useNavigate();

  const onChange = (name: string, value: string) => {
    setInputInfo((prev): StaffRegType => ({ ...prev, [name]: value }));
  };

  const createStaff = async (staffData: StaffRegType): Promise<StaffRegType | undefined> => {
    try {
      const res = await axiosInstance.post('/staffs', staffData);
      if (res.status === 200 || res.status === 201) {
        onRegistered();
        navigate('/staffs', { state: { refetch: true } });
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputInfo);
    createStaff(inputInfo);
  };

  const allFieldsCompleted = () => !!(inputInfo.name && inputInfo.password && inputInfo.loginId && inputInfo.phone);

  return (
    <div>
      <SubHeader title="직원등록" />

      <form onSubmit={handleSubmit}>
        <InputName title="이름" onChange={(value) => onChange('name', value)} />
        <InputContact title="휴대폰 번호" onChange={(value) => onChange('phone', value)} />
        <InputName title="아이디" onChange={(value) => onChange('loginId', value)} />
        <InputPw title="임시 비밀번호(PIN)" onChange={(value) => onChange('password', value)} />

        <br />

        <div className="flex-col">
          <div className="p-4 card-border cursor-pointer focus:border-primary-500">
            일반 직원 (기본) 가장 기본적인 권한만 가지고 있습니다.
          </div>
          <div className="p-4 card-border cursor-pointer">
            인포 직원 직원 관리, 수업/수강권 관리, 일정 관리 권한을 소유하고 있습니다.
          </div>
          <div className="p-4 card-border cursor-pointer">총괄 매니저 모든 권한을 소유하고 있습니다.</div>
        </div>

        <label htmlFor="basic">
          <input id="basic" type="checkbox" />
          일반 직원(기본)
        </label>
        <br />
        <label htmlFor="info">
          <input id="info" type="checkbox" />
          인포 직원
        </label>
        <br />
        <label htmlFor="manager">
          <input id="manager" type="checkbox" />
          총괄 매니저
        </label>
        <button
          className={`my-5 py-3 w-full rounded ${
            allFieldsCompleted() ? 'bg-primary-500 text-white' : 'bg-bg-100 text-text-400 pointer-events-none'
          }`}
          type="submit"
          onClick={handleSubmit}>
          완료
        </button>
      </form>

      {/* <StaffRegFirst />
      <StaffRegSecond />
      <StaffRegThird /> */}
    </div>
  );
};

export default CreateStaff;
