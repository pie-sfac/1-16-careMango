import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import { StateType } from '@/types/members/members';
import Input from '@components/common/Input/Input';
import Select from '@components/common/Select/Select';
import SelectSex from '@pages/members/components/SelectSex';
import SubHeader from '@components/common/SubHeader/SubHeader';
import AgreeCondition from '@pages/members/components/AgreeCondition';

const initialState: StateType = {
  name: '',
  birthDate: '',
  phone: '',
  sex: '',
  job: '',
  acqusitionFunnel: '',
  acquisitionFunnel: '',
};

const CreateMembers = () => {
  const [state, setState] = useState<StateType>(initialState);
  const [showJobInput, setShowJobInput] = useState<boolean>(false);
  const [showAcqInput, setShowAcqInput] = useState<boolean>(false);
  const [hasAgreed, setHasAgreed] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (event.target instanceof HTMLSelectElement) {
      if (name === 'job' && value === ' ') {
        setShowJobInput(true);
        return;
      } else if (name === 'acquisitionFunnel' && value === ' ') {
        setShowAcqInput(true);
        return;
      }
    }

    setState((prev) => ({ ...prev, [name]: value }));
    if (name === 'phone' || name === 'birthDate') {
      let formattedValue = value.replace(/\D/g, '');
      if (name === 'phone' && formattedValue.length <= 11) {
        if (formattedValue.length <= 7) formattedValue = formattedValue.replace(/(\d{3})(\d{1,4})/, '$1-$2');
        else formattedValue = formattedValue.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
      }
      if (name === 'birthDate' && formattedValue.length <= 8) {
        if (formattedValue.length <= 6) formattedValue = formattedValue.replace(/(\d{4})(\d{1,2})/, '$1-$2');
        else formattedValue = formattedValue.replace(/(\d{4})(\d{2})(\d{1,2})/, '$1-$2-$3');
      }
      setState((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }

    if (name === 'jobInput') {
      setState((prev) => ({ ...prev, job: value }));
    } else if (name === 'acquisitionFunnelInput') {
      setState((prev) => ({ ...prev, acquisitionFunnel: value }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }

    if (name === 'job' && value !== ' ') {
      setShowJobInput(false);
    }
    if (name === 'acquisitionFunnel' && value !== ' ') {
      setShowAcqInput(false);
    }
  };

  const handleSexChange = (selectedSex: string) => {
    setState((prev) => ({ ...prev, sex: selectedSex }));
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

  const mutation = useMutation(createMembers, {
    onSuccess: () => {
      console.log('성공');
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate(state);
    navigate('/members/new/register', { state: { memberName: state.name } });
  };

  const allFieldsCompleted = state.birthDate && state.sex && state.name && state.phone && hasAgreed;

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
            <SelectSex title="성별" onChange={handleSexChange} />
            <Input
              type="text"
              name="birthDate"
              value={state.birthDate}
              onChange={handleChange}
              label="생년월일"
              placeholder="0000-00-00"
              width="w-full"
              required
            />
            <Input
              type="text"
              name="phone"
              value={state.phone}
              onChange={handleChange}
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
                { label: '기타 - 직접입력', value: ' ' },
              ]}
              value={state.job}
              onChange={handleChange}
              label="직업"
              width="w-full"
              required
            />
            {showJobInput && (
              <Input
                type="text"
                name="jobInput"
                value={state.job}
                onChange={handleChange}
                label="직업 (직접입력)"
                width="w-full"
                required
              />
            )}
            <Select
              name="acquisitionFunnel"
              options={[
                { label: '선택해주세요', value: 0 },
                { label: '주변 추천', value: '주변 추천' },
                { label: '오프라인 광고 (배너, 현수막)', value: '오프라인 광고 (배너, 현수막)' },
                { label: 'SNS 광고 (페이스북, 인스타)', value: 'SNS 광고 (페이스북, 인스타)' },
                { label: '네이버 지도', value: '네이버 지도' },
                { label: '기타 - 직접입력', value: ' ' },
              ]}
              value={state.acquisitionFunnel}
              onChange={handleChange}
              label="방문 경로"
              width="w-full"
              required
            />
            {showAcqInput && (
              <Input
                type="text"
                name="acquisitionFunnelInput"
                value={state.acquisitionFunnel}
                onChange={handleChange}
                label="방문 경로 (직접입력)"
                width="w-full"
                required
              />
            )}
            <AgreeCondition title="회원 약관 동의" onChange={setHasAgreed} />
            <button
              className={`my-5 py-3 w-full rounded ${
                allFieldsCompleted ? 'bg-primary-500 text-white' : 'bg-bg-100 text-text-400 pointer-events-none'
              }`}
              type="submit"
              disabled={!allFieldsCompleted || mutation.isLoading}>
              완료
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateMembers;
