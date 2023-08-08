import React, { useEffect, useState, useCallback } from 'react';
import { axiosInstance } from '../utils/apiInstance';
import { ReactComponent as BlankPerson } from '../assets/icons/BlankPerson.svg';
import SearchBox from '../components/common/SearchBox';

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

function Home() {
  // const planStatus: string = '플랜 이용중';
  const [data, setData] = useState<ApiResponse | null>(null);

  const getData = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/me/summary');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    // console.log('useEffect 호출');
    getData();
  }, [getData]);

  return (
    <div>
      {data && (
        <>
          <SearchBox />
          <div className="mb-5">
            <ul className="flex w-full gap-5">
              <li className="w-full h-full">
                <a href="https://github.com/pie-sfac/1-16-careMango">
                  <img
                    src="./images/Banners.png"
                    alt="광고 배너"
                    className="w-full h-full object-cover object-center"
                  />
                </a>
              </li>
              <li className="w-full h-full">
                <a href="https://github.com/pie-sfac/1-16-careMango">
                  <img
                    src="./images/Banners.png"
                    alt="광고 배너"
                    className="w-full h-full object-cover object-center"
                  />
                </a>
              </li>
              <li className="w-full h-full">
                <a href="https://github.com/pie-sfac/1-16-careMango">
                  <img
                    src="./images/Banners.png"
                    alt="광고 배너"
                    className="w-full h-full object-cover object-center"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="grid grid-cols-3 gap-4 mb-5 h-96">
              <li className="h-full">
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
                        <BlankPerson />
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
              <li className="h-full">
                <span className="text-xl">나의 회원</span>
                <div className="h-full p-3 mt-3 rounded-2xl card_wrapper bg-slate-200">
                  <div className="relative h-full card">
                    <div className=" card_upper">
                      <span className="font-bold">나의 회원 수</span>
                      <div className="absolute top-0 right-0 p-2 bg-white rounded-full">
                        <BlankPerson />
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 card_down">
                      <span className="text-2xl font-extrabold text-primary-700">{data.center.memberCount}</span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="h-full">
                <span className="text-xl">전체 직원</span>
                <div className="h-full p-3 mt-3 rounded-2xl card_wrapper bg-slate-200">
                  <div className="relative h-full card">
                    <div className=" card_upper">
                      <span className="font-bold">전체 직원 수</span>
                      <div className="absolute top-0 right-0 p-2 bg-white rounded-full">
                        <BlankPerson />
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

export default Home;
