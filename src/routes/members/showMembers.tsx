import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { membersListState, searchQueryState } from '../../atoms/members/membersAtom';

type MembersData = {
  meta: {
    totalCount: number;
    size: number;
    count: number;
    page: number;
    hasMore: boolean;
  };
  datas: [
    {
      id: number;
      name: string;
      phone: string;
      sex: string;
      birthDate: string;
      createdAt: string;
      updatedAt: string;
      visitedAt: string;
    },
  ];
  message: 'string';
};

function ShowMembers() {
  const [members, setMembers] = useRecoilState(membersListState);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [itemData, setItemData] = useState<MembersData | undefined>();
  useEffect(() => {
    fetch('http://localhost:5173/data/membersData.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setItemData(data);
      });
  }, []);

  // 검색
  let displayedMembers;
  if (searchQuery) {
    displayedMembers = itemData?.datas.filter((data) => data.name.includes(searchQuery));
  } else {
    displayedMembers = itemData?.datas;
  }

  return (
    <div className="p-5 bg-bg-100">
      {/* 검색 */}
      <div className="flex w-1/3 overflow-hidden bg-white border rounded-xl">
        <input
          type="text"
          placeholder="회원/멤버 이름, 연락처로 검색하세요"
          value={searchQuery}
          className="flex-grow px-4 py-3 outline-none"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center justify-center p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M13.4765 14.8907C12.4957 15.5892 11.2958 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10C16 11.2958 15.5892 12.4957 14.8907 13.4765L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L13.4765 14.8907ZM14.5 10C14.5 7.51472 12.4853 5.5 10 5.5C7.51472 5.5 5.5 7.51472 5.5 10C5.5 12.4853 7.51472 14.5 10 14.5C12.4853 14.5 14.5 12.4853 14.5 10Z"
              fill="#505050"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-between my-3 font-bold">
        <div className="flex items-center justify-center">
          <h1 className="mr-2">나의 회원</h1>
          <p>{itemData?.datas.length || 0}</p>
        </div>
        <button className="px-2 py-1 bg-white border-2 border-solid border-line-300 rounded-xl" type="button">
          등록하기
        </button>
      </div>

      {/* 회원 목록 */}
      <ul>
        {/* 등록된 회원이 있는 경우 */}
        {displayedMembers && displayedMembers.length > 0 ? (
          displayedMembers.map((data) => (
            <li key={data.id} className="flex items-center justify-between p-3 my-1 bg-white rounded-md base-font">
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
                <p className="ml-4 font-bold">{data.name}</p>
              </div>
              <div className="flex">
                <p className="mr-5">{data.sex}</p>
                <p>22.00.00~22.00.00</p>
                {/* <p>{itemData.meta.count}회 / {itemData.meta.totalCount}회</p> */}
              </div>
              <div className="flex">
                <p className="mr-5">김파이</p>
                <p>{data.createdAt}</p>
              </div>
            </li>
          ))
        ) : (
          // 등록된 회원이 없는 경우
          <div>
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="50" viewBox="0 0 42 50" fill="none">
                <g clipPath="url(#clip0_20_35022)">
                  <path
                    d="M21 24C27.6274 24 33 18.6274 33 12C33 5.37258 27.6274 0 21 0C14.3726 0 9 5.37258 9 12C9 18.6274 14.3726 24 21 24Z"
                    fill="#CFCFCF"
                  />
                  <path
                    d="M42 42.1174C42 35.6952 32.5932 26.7539 21.0061 26.7539C9.41907 26.7539 0 35.6952 0 42.1174C0 48.5397 9.40682 49.9987 20.9939 49.9987C32.5809 49.9987 41.9877 48.5397 41.9877 42.1174H42Z"
                    fill="#CFCFCF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_20_35022">
                    <rect width="42" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="flex items-center justify-center p-3 my-1 base-font">+ 회원을 등록하세요</p>
          </div>
        )}
      </ul>
    </div>
  );
}

export default ShowMembers;
