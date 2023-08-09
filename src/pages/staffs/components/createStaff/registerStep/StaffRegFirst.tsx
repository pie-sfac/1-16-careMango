import React, { useState } from 'react';
import { axiosInstance } from '../../../../utils/apiInstance';
import InputName from '../../../common/InputName';
import InputContact from '../../../common/InputContact';

interface StaffRegFirstProps {
  inputInfo: string;
  setInputInfo: void;
}

const StaffRegFirst = () => {
  const onChange = (name: string, value: string) => {};
  return <div>첫 번째</div>;
};

export default StaffRegFirst;
