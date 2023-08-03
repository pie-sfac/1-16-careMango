import React from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiInstance';
import SubHeader from '../../components/common/SubHeader';

const CreateStaff = () => (
  <>
    <SubHeader title="직원등록" />
    <div>시발</div>
  </>
);

export default CreateStaff;
