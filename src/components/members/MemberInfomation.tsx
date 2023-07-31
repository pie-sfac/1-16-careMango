import React from 'react';
import { Profile, Edit } from '../common/Icons';

const MemberInfomation = () => (
  <div className=" flex justify-between items-center border-2 rounded-md p-4">
    <div className="flex items-center">
      <Profile />
      <p>이름</p>
      <p>mango</p>
      <p>생년월일</p>
      <p>2000.01.01</p>
      <p>등록일</p>
      <p>2023.07.24</p>
      <p>성별</p>
      <p>여</p>
      <p>전화번호</p>
      <p>010-1234-5678</p>
      <p>직업형태</p>
      <p>학생</p>
    </div>
    <Edit />
  </div>
);

export default MemberInfomation;
