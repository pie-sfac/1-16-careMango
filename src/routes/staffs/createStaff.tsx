import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiInstance';
import SubHeader from '../../components/common/SubHeader';
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
  roles: [],
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

  const getRoleId = async () => {
    const res = await axiosInstance.get('/roles');
    console.log(res.data);
  };

  // getRoleId();

  const addPermission = (name: string, value: number) => {
    if (!inputInfo.roles.includes(value)) {
      inputInfo.roles.push(value);
    } else {
      inputInfo.roles.pop();
    }
    setInputInfo((prev): StaffRegType => ({ ...prev, roles: [value] }));
    console.log(inputInfo);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputInfo);
    createStaff(inputInfo);
    navigate('/staffs');
  };

  const allFieldsCompleted = () => !!(inputInfo.name && inputInfo.password && inputInfo.loginId && inputInfo.phone);

  return (
    <>
      <SubHeader title="직원등록" />
      <div className="flex flex-col items-center w-full">
        {/* <StaffRegFirst /> */}

        <form onSubmit={handleSubmit}>
          <InputName title="이름" onChange={(value) => onChange('name', value)} />
          <InputContact title="휴대폰 번호" onChange={(value) => onChange('phone', value)} />
          <InputName title="아이디" onChange={(value) => onChange('loginId', value)} />
          <InputPw title="임시 비밀번호(PIN)" onChange={(value) => onChange('password', value)} />

          <br />

          <div className="flex flex-col">
            <div className="p-4 border-solid border-2 border-primary-500 cursor-pointer">
              일반 직원 (기본) 가장 기본적인 권한만 가지고 있습니다.
            </div>
            <button type="button" className="p-4 card-border" onClick={() => addPermission('roles', 3)}>
              인포 직원 직원 관리, 수업/수강권 관리, 일정 관리 권한을 소유하고 있습니다.
            </button>
            <button type="button" className="p-4 card-border" onClick={() => addPermission('roles', 4)}>
              총괄 매니저 모든 권한을 소유하고 있습니다.
            </button>
          </div>

          <button
            className={`my-5 py-3 w-full rounded ${
              allFieldsCompleted() ? 'bg-primary-500 text-white' : 'bg-bg-100 text-text-400 pointer-events-none'
            }`}
            type="submit"
            onClick={handleSubmit}>
            완료
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateStaff;
