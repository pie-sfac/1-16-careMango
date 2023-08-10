import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import SubHeader from '@/components/common/SubHeader';
import InputName from '@components/common/InputName';
import InputContact from '@components/common/InputContact';
import InputPw from '@components/common/InputPw';
import { info } from 'console';

interface StateType {
  loginId: string;
  password: string;
  name: string;
  phone: string;
  roles: number[];
}

const initialState: StateType = {
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
  const [state, setState] = useState<StateType>(initialState);
  const [infoChecked, setInfoChecked] = useState(false);
  const [managerChecked, setManagerChecked] = useState(false);
  const navigate = useNavigate();

  const onChange = (name: string, value: string) => {
    setState((prev): StateType => ({ ...prev, [name]: value }));
  };

  // 역할(권한) 로그 : 센터마다 상이
  const getRoles = async () => {
    const res = await axiosInstance.get('roles');
    console.log(res.data);
  };

  useEffect(() => {
    getRoles();
  }, []);

  const createStaff = async (staffData: StateType): Promise<StateType | undefined> => {
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

  const addRole = (value: number) => {
    if (!state.roles.includes(value)) {
      state.roles.push(value);
    } else {
      state.roles = state.roles.filter((elem) => elem !== value);
    }
    console.log(state);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
    createStaff(state);
  };

  const allFieldsCompleted = () => !!(state.name && state.password && state.loginId && state.phone && state.roles);

  return (
    <div>
      <SubHeader title="직원등록" />

      <form onSubmit={handleSubmit}>
        <InputName title="이름" onChange={(value) => onChange('name', value)} />
        <InputContact title="휴대폰 번호" onChange={(value) => onChange('phone', value)} />
        <InputName title="아이디" onChange={(value) => onChange('loginId', value)} />
        <InputPw title="임시 비밀번호(PIN)" onChange={(value) => onChange('password', value)} />

        <div className="flex flex-col">
          <input
            type="button"
            className="p-4 border-solid border-2 border-primary-500 cursor-pointer"
            value={'일반 직원 (기본) 가장 기본적인 권한만 가지고 있습니다.'}
            onClick={() => console.log('basic clicked')}
          />
          <input
            type="button"
            className={
              infoChecked
                ? 'p-4 border-solid border-2 border-primary-500 cursor-pointer'
                : 'p-4 border-solid border-2 cursor-pointer'
            }
            value={'인포 직원 직원 관리, 수업/수강권 관리, 일정 관리 권한을 소유하고 있습니다.'}
            onClick={() => {
              console.log('info clicked');
              addRole(3);
              setInfoChecked(!infoChecked);
            }}
          />
          <input
            type="button"
            className={
              managerChecked
                ? 'p-4 border-solid border-2 border-primary-500 cursor-pointer'
                : 'p-4 border-solid border-2 cursor-pointer'
            }
            value={'총괄 매니저 모든 권한을 소유하고 있습니다.'}
            onClick={() => {
              console.log('manager clicked');
              addRole(4);
              setManagerChecked(!managerChecked);
            }}
          />
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
  );
};

export default CreateStaff;
