import React, { useEffect, useState, ChangeEvent, FormEvent, useCallback } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
import { axiosInstance } from '../utils/apiInstance';

import '../index.css';

interface ApiResponse {
  center: {
    memberCount: number;
    myMemberCount: number;
    staffCount: number;
  };
  mySchedule: {
    counselingCount: number;
    lessonCount: number;
  };
  message: string;
}

function Main() {
  // const planStatus: string = '플랜 이용중';
  const [data, setData] = useState<ApiResponse | null>(null);
  const [searchInputValue, setSearchInputValue] = useState('');
  // const token = localStorage.getItem('accessToken');

  const getData = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/me/summary');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    console.log('useEffect 호출');
    getData();
  }, [getData]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(`search for "${inputValue}"`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
  };

  return (
    <div>
      {data && (
        <>
          <div className="flex justify-end my-4">
            <form onSubmit={handleSubmit} className="flex items-center inline-block ">
              <input
                type="text"
                name="search"
                placeholder="회원/멤버 이름, 연락처로 검색하세요"
                value={searchInputValue}
                onChange={handleChange}
                className="p-2 mr-2 border rounded-md"
              />
              <button type="submit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.4765 14.8907C12.4957 15.5892 11.2958 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10C16 11.2958 15.5892 12.4957 14.8907 13.4765L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L13.4765 14.8907ZM14.5 10C14.5 7.51472 12.4853 5.5 10 5.5C7.51472 5.5 5.5 7.51472 5.5 10C5.5 12.4853 7.51472 14.5 10 14.5C12.4853 14.5 14.5 12.4853 14.5 10Z"
                    fill="#505050"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="flex justify-between px-1 mb-5">
            <ul className="flex gap-3">
              <li>
                <a href="https://github.com/pie-sfac/1-16-careMango">
                  <img src="./images/Banners.png" alt="광고 배너" />
                </a>
              </li>
              <li>
                <a href="https://github.com/pie-sfac/1-16-careMango">
                  <img src="./images/Banners.png" alt="광고 배너" />
                </a>
              </li>
              <li>
                <a href="https://github.com/pie-sfac/1-16-careMango">
                  <img src="./images/Banners.png" alt="광고 배너" />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="grid grid-cols-3 gap-4 mb-5">
              <li>
                <span className="text-xl">나의 오늘 일정</span>
                <div className="h-full p-3 mt-3 rounded-2xl card_wrapper bg-slate-200">
                  <div className="relative h-full card">
                    <div className="card_upper">
                      <span className="font-bold">
                        총 {data.mySchedule.lessonCount + data.mySchedule.counselingCount}건의 일정
                      </span>
                      <br />
                      <span>
                        수업 {data.mySchedule.lessonCount}건, 상담 {data.mySchedule.counselingCount}건
                      </span>
                      <div className="absolute top-0 right-0 p-2 bg-white rounded-full">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM8 11C10.7 11 13.8 12.29 14 13V14H2V13.01C2.2 12.29 5.3 11 8 11ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                            fill="#CFCFCF"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 card_down">
                      <span className="text-2xl font-extrabold text-primary-700">
                        {data.mySchedule.lessonCount + data.mySchedule.counselingCount}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <span className="text-xl">나의 회원</span>
                <div className="h-full p-3 mt-3 rounded-2xl card_wrapper bg-slate-200">
                  <div className="relative h-full card">
                    <div className=" card_upper">
                      <span className="font-bold">나의 회원 수</span>
                      <div className="absolute top-0 right-0 p-2 bg-white rounded-full">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM8 11C10.7 11 13.8 12.29 14 13V14H2V13.01C2.2 12.29 5.3 11 8 11ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                            fill="#CFCFCF"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 card_down">
                      <span className="text-2xl font-extrabold text-primary-700">{data.center.memberCount}</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <span className="text-xl">전체 직원</span>
                <div className="h-full p-3 mt-3 rounded-2xl card_wrapper bg-slate-200">
                  <div className="relative h-full card">
                    <div className=" card_upper">
                      <span className="font-bold">전체 직원 수</span>
                      <div className="absolute top-0 right-0 p-2 bg-white rounded-full">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM8 11C10.7 11 13.8 12.29 14 13V14H2V13.01C2.2 12.29 5.3 11 8 11ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                            fill="#CFCFCF"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 card_down">
                      <span className="text-2xl font-extrabold text-primary-700">{data.center.staffCount}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Main;
