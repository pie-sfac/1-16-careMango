import { useState } from 'react';
import Card from '@components/common/Card/Card';
import SubHeader from '@components/common/SubHeader/SubHeader';
import Input from '@components/common/Input/Input';
import { ReactComponent as Profile40 } from '@/assets/icons/Profile_40.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateStaffType } from '@/types/staffs/updateStaffs';
import { useMutation, useQuery } from 'react-query';
import { axiosInstance } from '@/utils/apiInstance';

const initialState: UpdateStaffType = {
  name: '',
  phone: '',
  active: true,
  roles: [{ id: 0, name: '' }],
  loginId: '',
};

const UpdateStaffInfoPage = () => {
  const [state, setState] = useState<UpdateStaffType>(initialState);
  const { staffId } = useParams<{ staffId: string | undefined }>();
  const [originalName, setOriginalName] = useState('');
  const navigate = useNavigate();

  const { isLoading } = useQuery(
    ['staffData', staffId],
    async () => {
      if (!staffId) return;
      const res = await axiosInstance.get(`staffs/${staffId}`);
      return res.data;
    },
    {
      enabled: !!staffId,
      onSuccess: (data) => {
        if (data) {
          setState({
            name: data.name,
            phone: data.phone,
            active: data.active,
            roles: data.roles,
            loginId: data.loginId,
          });
          setOriginalName(data.name);
        }
      },
      onError: (err) => console.log(err),
    },
  );

  const mutation = useMutation((staffsData: UpdateStaffType) => axiosInstance.put(`staffs/${staffId}`, staffsData), {
    onSuccess: () => {
      console.log('업데이트 성공');
      navigate(`/staffs/${staffId}`);
    },
    onError: (err) => console.log('업데이트 실패', err),
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate(state);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: rawValue } = event.target;

    let value = rawValue;

    if (name === 'phone') {
      value = rawValue.replace(/\D/g, '');

      if (value.length <= 7) {
        value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
      } else if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
      }
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const allFieldsCompleted = state.name && state.phone;

  if (isLoading) return <div>loading...`</div>;

  return (
    <>
      <SubHeader title="직원 정보" />
      <div className="flex flex-col items-center">
        <Card>
          <div className="flex p-4 items-center">
            <Profile40 />
            <div className="flex items-center">
              <p className="ml-4 main-title text-primary-500">{originalName}</p>
              <span className="px-2 py-1 ml-2 text-sm bg-bgc-50 text-primary-500 rounded">
                권한 {state.roles[0].id}
              </span>
            </div>
          </div>
          <div className="flex m-4 items-center">
            <p>{state.active ? '재직중' : '퇴사'}</p>
          </div>
        </Card>
        <div className="flex flex-col w-full max-w-md">
          <div className="flex flex-col items-center justify-center my-6">
            <h1 className="main-title mt-2">직원 정보</h1>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                label="이름"
                value={state.name}
                onChange={handleChange}
                width="w-full"
                required
              />
              <Input
                type="text"
                name="phone"
                label="휴대폰 번호"
                value={state.phone}
                onChange={handleChange}
                width="w-full"
                required
              />
              <Input type="text" label="아이디" value={state.loginId} width="w-full" />
              <Input type="password" label="비밀번호" value="********" width="w-full" />
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
      </div>
    </>
  );
};

export default UpdateStaffInfoPage;
