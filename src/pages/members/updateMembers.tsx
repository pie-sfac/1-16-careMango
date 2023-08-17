import React, { useState, ChangeEvent, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import { UpdateStateType } from '@/types/members/members';
import SubHeader from '@components/common/SubHeader';
import Input from '@components/common/Input/Input';
import Select from '@components/common/Select/Select';
import SelectSex from '@pages/members/components/SelectSex';
import AgreeCondition from '@pages/members/components/AgreeCondition';

const initialState: UpdateStateType = {
  name: '',
  birthDate: '',
  phone: '',
  sex: '',
  job: '',
  acquisitionFunnel: '',
};

const UpdateMembers = () => {
  const [state, setState] = useState<UpdateStateType>(initialState);
  const [showJobInput, setShowJobInput] = useState<boolean>(false);
  const [showAcqInput, setShowAcqInput] = useState<boolean>(false);
  const { memberId } = useParams<{ memberId: string | undefined }>();
  const navigate = useNavigate();

  // 기존 데이터 불러오기
  const fetchMembersData = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`members/${memberId}`);
      setState({
        name: res.data.name,
        birthDate: res.data.birthDate,
        phone: res.data.phone,
        sex: res.data.sex,
        job: res.data.job,
        acquisitionFunnel: res.data.acquisitionFunnel,
      });
    } catch (err) {
      console.error(err);
    }
  }, [memberId]);

  // 변경 api 연결
  const updateMembers = async (membersData: UpdateStateType) => {
    try {
      const res = await axiosInstance.put(`members/${memberId}`, membersData);
      if (res.status === 200 || res.status === 201) {
        console.log('성공');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMembersData();
  }, [fetchMembersData]);

  const onChange = (name: string, value: string) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;

    if (event.target instanceof HTMLSelectElement) {
      if (name === 'job') {
        setShowJobInput(value === ' ');
      }
      if (name === 'acquisitionFunnel') {
        setShowAcqInput(value === ' ');
      }
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };

  // 직접 입력 값 넣기
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'jobInput') {
      setState((prev) => ({ ...prev, job: value }));
    } else if (name === 'acquisitionFunnelInput') {
      setState((prev) => ({ ...prev, acquisitionFunnel: value }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
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
    updateMembers(state);
    navigate(`/members/${memberId}`);
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
            <p>등록된 환자 정보 입니다.</p>
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
            <SelectSex title="성별" defaultState={state.sex} onChange={(value) => onChange('sex', value)} />
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
            {!showJobInput ? (
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
            ) : (
              <Input
                type="text"
                name="jobInput"
                value={state.job}
                onChange={handleInputChange}
                label="직업 (직접입력)"
                width="w-full"
                required
              />
            )}

            {!showAcqInput ? (
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
            ) : (
              <Input
                type="text"
                name="acquisitionFunnelInput"
                value={state.acquisitionFunnel}
                onChange={handleInputChange}
                label="방문 경로 (직접입력)"
                width="w-full"
                required
              />
            )}
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

export default UpdateMembers;
