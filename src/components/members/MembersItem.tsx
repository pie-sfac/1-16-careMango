import React from 'react';
import { MembersData } from '../../types/members/members';

type MembersType = MembersData['datas'][number];

const MembersItem = ({ members }: { members: MembersType }) => (
  <div key={members.id} className="flex items-center justify-between p-3 my-1 bg-white rounded-md base-font">
    <div className="flex">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g clipPath="url(#clip0_581_12363)">
          <circle cx="12" cy="12" r="11.625" fill="#F4F4F4" stroke="#CFCFCF" strokeWidth="0.75" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.9062 12.64C14.54 12.2351 15.7511 10.759 15.7511 9C15.7511 6.92893 14.0721 5.25 12.0011 5.25C9.93001 5.25 8.25108 6.92893 8.25108 9C8.25108 10.8022 9.52234 12.3074 11.217 12.6679C6.63602 13.1599 3.19545 16.4669 3.48146 20.3516C9.83744 26.114 18.6859 22.3474 20.7921 19.9672C20.5261 16.3544 17.0914 12.9812 12.9062 12.64Z"
            fill="#CFCFCF"
          />
        </g>
        <defs>
          <clipPath id="clip0_581_12363">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <p className="ml-4 font-bold">{members.name}</p>
    </div>
    <div className="flex">
      <p className="mr-5">{members.sex}</p>
      <p>22.00.00~22.00.00</p>
      {/* <p>{itemData.meta.count}회 / {itemData.meta.totalCount}회</p> */}
    </div>
    <div className="flex">
      <p className="mr-5">김파이</p>
      <p>{members.createdAt}</p>
    </div>
  </div>
);

export default MembersItem;
