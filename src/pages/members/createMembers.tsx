import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import { StateType } from '@/types/members/members';
import SubHeader from '@components/common/SubHeader';
import Input from '@components/common/Input/Input';
import Select from '@components/common/Select/Select';
import SelectSex from '@pages/members/components/SelectSex';
import AgreeCondition from '@pages/members/components/AgreeCondition';

const initialState: StateType = {
  name: '',
  birthDate: '',
  phone: '',
  sex: '',
  job: '',
  acqusitionFunnel: '',
  acquisitionFunnel: '',
  // toss: [
  //   {
  //     id: 10,
  //     agree: false,
  //   },
  // ],
};

const CreateMembers = () => {
  const [state, setState] = useState<StateType>(initialState);
  const navigate = useNavigate();

  const onChange = (name: string, value: string) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const createMembers = async (membersData: StateType) => {
    try {
      const res = await axiosInstance.post('/members', membersData);
      if (res.status === 200 || res.status === 201) {
        console.log('성공');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev): StateType => ({ ...prev, [name]: value }));
  };

  // 자동 하이픈
  const numberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value: rawValue } = event.target;
    let value = rawValue.replace(/\D/g, '');

    // 휴대폰 번호 처리
    if (name === 'phone') {
      if (value.length > 11) return;

      if (value.length <= 7) {
        value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
      } else if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
      }
    }

    // 생년월일 처리
    else {
      if (value.length > 8) return;

      if (value.length <= 6) {
        value = value.replace(/(\d{4})(\d{1,2})/, '$1-$2');
      } else if (value.length <= 8) {
        value = value.replace(/(\d{4})(\d{2})(\d{1,2})/, '$1-$2-$3');
      }
    }
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createMembers(state);
    navigate('/members/new/register', { state: { memberName: state.name } });
  };

  const allFieldsCompleted = state.birthDate && state.sex && state.name && state.phone;

  console.log(state);
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
            <Input
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
              label="이름"
              placeholder="이름을 입력해주세요."
              width="w-full"
              required
            />
            <SelectSex title="성별" onChange={(value) => onChange('sex', value)} />
            <Input
              type="text"
              name="birthDate"
              value={state.birthDate}
              onChange={numberChange}
              label="생년월일"
              placeholder="0000-00-00"
              width="w-full"
              required
            />
            <Input
              type="text"
              name="phone"
              value={state.phone}
              onChange={numberChange}
              label="휴대폰 번호"
              placeholder="010-0000-0000"
              width="w-full"
              required
            />
            <Select
              name="job"
              options={[
                { label: '선택해주세요', value: 0 },
                { label: '사무직', value: '사무직' },
                { label: '현장직', value: '현장직' },
                { label: '가사노동자', value: '가사노동자' },
                { label: '학생', value: '학생' },
                { label: '무직', value: '무직' },
                { label: '기타 - 직접입력', value: 6 },
              ]}
              value={state.job}
              onChange={handleChange}
              label="직업"
              width="w-full"
              required
            />
            <Select
              name="acquisitionFunnel"
              options={[
                { label: '선택해주세요', value: 0 },
                { label: '주변 추천', value: '주변 추천' },
                { label: '오프라인 광고 (배너, 현수막)', value: '오프라인 광고 (배너, 현수막)' },
                { label: 'SNS 광고 (페이스북, 인스타)', value: 'SNS 광고 (페이스북, 인스타)' },
                { label: '네이버 지도', value: '네이버 지도' },
                { label: '기타 - 직접입력', value: 5 },
              ]}
              value={state.acquisitionFunnel}
              onChange={handleChange}
              label="방문 경로"
              width="w-full"
              required
            />
            <AgreeCondition title="회원 약관 동의" />
            <button
              className={`my-5 py-3 w-full rounded ${
                allFieldsCompleted ? 'bg-primary-500 text-white' : 'bg-bg-100 text-text-400 pointer-events-none'
              }`}
              type="submit">
              완료
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateMembers;
