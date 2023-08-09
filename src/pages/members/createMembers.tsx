import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiInstance';
import SubHeader from '../../components/common/SubHeader';
import InputName from '../../components/common/InputName';
import SelectSex from '../../components/common/SelectSex';
import InputContact from '../../components/common/InputContact';
import InputBirth from '../../components/common/InputBirth';
import SelectJob from '../../components/common/SelectJob';
import SelectVisitRoute from '../../components/common/SelectVisitRoute';
import AgreeCondition from '../../components/members/AgreeCondition';

interface StateType {
  name: string;
  birthDate: string;
  phone: string;
  sex: string;
  job: string;
  acqusitionFunnel: string;
  acquisitionFunnel: string;
  // toss: [
  //   {
  //     id: number;
  //     agree: boolean;
  //   },
  // ];
}

const initialState: StateType = {
  name: '',
  birthDate: '',
  phone: '',
  sex: '',
  job: '',
  acqusitionFunnel: 'string',
  acquisitionFunnel: 'string',
  // toss: [
  //   {
  //     id: 10,
  //     agree: false,
  //   },
  // ],
};

interface CreateMembersProps {
  onRegisterd: () => void;
}

const CreateMembers = ({ onRegisterd }: CreateMembersProps) => {
  const [state, setState] = useState<StateType>(initialState);
  const navigate = useNavigate();

  const onChange = (name: string, value: string) => {
    setState((prev): StateType => ({ ...prev, [name]: value }));
  };

  // 약관 동의
  // const handleAgree = (agreement: boolean) => {
  //   setState((prev) => ({
  //     ...prev,
  //     toss: [
  //       {
  //         ...prev.toss[0],
  //         agree: agreement,
  //       },
  //     ],
  //   }));
  // };

  // 회원 조회 페이지로
  const goMainMembers = () => {
    console.log(state);
    navigate('/members');
  };

  const createMembers = async (membersData: StateType): Promise<StateType | undefined> => {
    try {
      const res = await axiosInstance.post('/members', membersData);
      if (res.status === 200 || res.status === 201) {
        // HTTP 상태 코드가 200(성공) 또는 201(생성됨)인 경우
        onRegisterd(); // 여기에서 onCompletion (즉, setIsComplete(true)를 호출합니다)
        navigate('/members', { state: { refetch: true } });
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  //   try {
  //     const res = await axiosInstance.post('/members', membersData);
  //     const createdMembers = res.data;
  //     navigate('/members', { state: { refetch: true } });
  //     console.log('res.status=', res.status);
  //     return createdMembers;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(state);
    createMembers(state);
  };

  // 필수 입력 값들이 채워지면 완료 버튼 활성화
  // const allFieldsCompleted = () => !!(state.birthDate && state.sex && state.name && state.phone && state.toss[0].agree);
  const allFieldsCompleted = () => !!(state.birthDate && state.sex && state.name && state.phone);

  return (
    <>
      <SubHeader title="회원등록" />
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-full max-w-md">
          <div className="flex flex-col items-center justify-center my-6">
            <h1 className="mb-3 text-4xl font-bold">회원정보</h1>
            <p>회원 정보를 등록하세요</p>
          </div>
          <form onSubmit={handleSubmit}>
            <InputName title="이름" onChange={(value) => onChange('name', value)} />
            <SelectSex title="성별" onChange={(value) => onChange('sex', value)} />
            <InputBirth title="생년월일" onChange={(value) => onChange('birthDate', value)} />
            <InputContact title="휴대폰 번호" onChange={(value) => onChange('phone', value)} />
            <SelectJob title="직업" onChange={(value) => onChange('job', value)} />
            <SelectVisitRoute title="방문 경로" onChange={(value) => onChange('acquisitionFunnel', value)} />
            <AgreeCondition title="회원 약관 동의" />
            {/* <AgreeCondition title="회원 약관 동의" onChange={handleAgree} /> */}
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
      </div>
    </>
  );
};

export default CreateMembers;
