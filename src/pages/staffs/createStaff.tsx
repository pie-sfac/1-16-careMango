import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import SubHeader from '@components/common/SubHeader/SubHeader';
import Input from '@components/common/Input/Input';

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prev) => ({ ...prev, [name]: value }));
    if (name === 'phone') {
      let formattedValue = value.replace(/\D/g, '');
      if (name === 'phone' && formattedValue.length <= 11) {
        if (formattedValue.length <= 7) formattedValue = formattedValue.replace(/(\d{3})(\d{1,4})/, '$1-$2');
        else formattedValue = formattedValue.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
      }
      setState((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 역할(권한) 로그 : 센터마다 상이
  const getRoles = async () => {
    const res = await axiosInstance.get('roles');
    console.log(res.data);
  };

  useEffect(() => {
    getRoles();
  }, []);

  const addStaff = async (staffData: StateType): Promise<StateType | undefined> => {
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
    addStaff(state);
  };

  const allFieldsCompleted = () => !!(state.name && state.password && state.loginId && state.phone && state.roles);

  return (
    <>
      <SubHeader title="직원등록" />
      <div className="flex flex-col items-center w-full">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            label="이름"
            value={state.name}
            onChange={handleChange}
            placeholder="이름을 입력해 주세요"
            width="w-1/3"
            required
          />
          <Input
            type="text"
            name="phone"
            label="휴대폰 번호"
            value={state.phone}
            onChange={handleChange}
            placeholder="000-0000-0000"
            width="w-1/3"
            required
          />
          <Input
            type="text"
            name="loginId"
            label="아이디"
            value={state.loginId}
            onChange={handleChange}
            width="w-1/3"
            required
          />
          <Input
            type="password"
            name="password"
            label="임시 비밀번호(PIN)"
            value={state.password}
            onChange={handleChange}
            width="w-1/3"
            required
          />

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
    </>
  );
};

export default CreateStaff;
