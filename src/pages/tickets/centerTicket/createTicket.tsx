import React, { useState } from 'react';
import { axiosInstance } from '@/utils/apiInstance';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { LessonTypeEnum, TermUnitEnum } from '@/enums/Ticket';
import { CreateTicketType } from '@/types/tickets/tickets';
import SubHeader from '@components/common/SubHeader/SubHeader';
import Select from '@components/common/Select/Select';
import Input from '@components/common/Input/Input';
import CompleteButton from '@components/common/CompleteButton';
import { ReactComponent as Plus } from '@/assets/icons/Plus.svg';
import { ReactComponent as Minus } from '@/assets/icons/Minus.svg';

const CreateTicketPage = () => {
  const initialState = {
    lessonType: '',
    title: '',
    defaultTerm: 0,
    defaultTermUnit: 'MONTH',
    duration: 0,
    defaultCount: 0,
    maxServiceCount: 0,
  };

  const [state, setState] = useState<CreateTicketType>(initialState);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev): CreateTicketType => ({ ...prev, [name]: value }));
  };

  const filteredState = { ...state };
  delete filteredState.maxServiceCount;

  const createTicketMutation = useMutation(
    async (ticketData: CreateTicketType) => {
      const res = await axiosInstance.post(`/tickets`, ticketData);
      return res.data;
    },
    {
      onSuccess: () => {
        navigate('/tickets/center');
      },
      onError: () => {
        console.log('error');
      },
    },
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createTicketMutation.mutate(state);
  };

  const decreaseCount = () => {
    if (state.maxServiceCount !== undefined && state.maxServiceCount > 0) {
      setState((prev) => ({
        ...prev,
        maxServiceCount: prev.maxServiceCount && prev.maxServiceCount - 1,
      }));
    }
  };

  const increaseCount = () => {
    setState((prev) => ({ ...prev, maxServiceCount: (prev.maxServiceCount || 0) + 1 }));
  };

  return (
    <>
      <SubHeader title="수강권 추가" />
      <h1 className="main-title">수강권 추가</h1>
      <p>센터의 수강권을 추가하세요</p>

      <h2 className="my-10 small-title">수강권 정보 설정</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col flex-wrap h-[32rem]">
          <Select
            name="lessonType"
            options={[
              { label: '선택해주세요', value: '' },
              { label: LessonTypeEnum.SINGLE, value: 'SINGLE' },
            ]}
            value={state.lessonType}
            onChange={handleChange}
            label="수업 유형"
            required
            width="w-80"
          />

          <Input
            name="title"
            type="text"
            value={state.title}
            onChange={handleChange}
            label="수강권명"
            placeholder="수강권명을 입력해주세요(15자이내)"
            required
            width="w-80"
            maxLength={15}
          />

          <div>
            <Input
              name="defaultTerm"
              type="number"
              value={state.defaultTerm}
              onChange={handleChange}
              label="수강권 기간"
              placeholder={initialState.defaultTerm.toString()}
              required
              width="w-56"
              unitSelect={
                <Select
                  name="defaultTermUnit"
                  options={[
                    { label: TermUnitEnum.DAY, value: 'DAY' },
                    { label: TermUnitEnum.WEEK, value: 'WEEK' },
                    { label: TermUnitEnum.MONTH, value: 'MONTH' },
                    { label: TermUnitEnum.YEAR, value: 'YEAR' },
                  ]}
                  value={state.defaultTermUnit}
                  onChange={handleChange}
                  required
                />
              }
            />
          </div>

          <Input
            name="duration"
            type="number"
            value={state.duration}
            onChange={handleChange}
            label="시간"
            placeholder={initialState.duration.toString()}
            unit="분"
            required
            width="w-80"
          />

          <Input
            name="defaultCount"
            type="number"
            value={state.defaultCount}
            onChange={handleChange}
            label="기본횟수"
            placeholder={initialState.defaultCount.toString()}
            unit="회"
            required
            width="w-80"
          />

          <Input
            name="maxServiceCount"
            type="number"
            value={state.maxServiceCount}
            onChange={handleChange}
            label="서비스 횟수"
            placeholder="0"
            leftBtn={
              <button type="button" onClick={decreaseCount} className="mr-2 icon-btn">
                <Minus />
              </button>
            }
            rightBtn={
              <button type="button" onClick={increaseCount} className="ml-2 icon-btn">
                <Plus />
              </button>
            }
            unit="회"
            align="text-center"
            width="w-72"
            required
          />
        </div>

        <CompleteButton state={filteredState} text="저장" />
      </form>
    </>
  );
};
export default CreateTicketPage;
