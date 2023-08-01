import React, { useEffect, useState, ChangeEvent, FormEvent, useCallback } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
import { axiosInstance } from '../utils/apiInstance';
import BottomNav from '../components/common/BottomNav';
import { ReactComponent as Logo } from '../assets/icons/Logo.svg';

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
  const planStatus: string = '플랜 이용중';
  // const accessToken = localStorage.getItem('accessToken');
  // const refreshToken = localStorage.getItem('refreshToken');
  const [data, setData] = useState<ApiResponse | null>(null);
  const [searchInputValue, setSearchInputValue] = useState('');

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL}/me/summary`, {
  //       headers: {
  //         accept: 'application/json',
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       // console.log(response.data);
  //       setData(response.data);
  //     });
  // }, [accessToken]);

  const getData = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/me/summary');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  // useEffect(() => {
  //   const interval = setInterval(
  //     () => {
  //       axios
  //         .post(
  //           `${import.meta.env.VITE_API_URL}/tokens`,
  //           {},
  //           {
  //             headers: {
  //               accept: 'application/json',
  //               Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
  //             },
  //           },
  //         )
  //         .then((response) => {
  //           localStorage.setItem('accessToken', response.data.accessToken);
  //           localStorage.setItem('refreshToken', response.data.refreshToken);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     },
  //     15 * 60 * 1000,
  //   );

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  // useTokenRefresher();

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
          <header className="flex items-center justify-between mb-5">
            <h1>
              <Logo />
            </h1>
            <div className="flex items-center">
              <p className="mr-2">박관리자</p>
              <div className="mr-2">{planStatus}</div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.0001 2.5C12.2762 2.5 12.5001 2.72386 12.5001 3V4.25042C13.5767 4.2616 14.836 4.55325 15.9359 5.42061C17.2476 6.45495 18.2199 8.21849 18.4615 10.9803C18.4634 11.002 18.4644 11.0238 18.4644 11.0456V15.9906C18.4644 16.3365 18.4814 16.4596 18.5849 16.5885C18.7093 16.7434 19.0746 17.0287 20.1611 17.2675C20.535 17.3497 20.787 17.7003 20.7457 18.081C20.7044 18.4616 20.3829 18.75 20.0001 18.75H14.985C14.9161 19.3212 14.6128 19.8582 14.1213 20.2678C13.5587 20.7366 12.7956 21 12 21C11.2044 21 10.4413 20.7366 9.87868 20.2678C9.38723 19.8582 9.0839 19.3212 9.01503 18.75H4.00007C3.64529 18.75 3.33904 18.5014 3.2661 18.1542C3.19316 17.807 3.37348 17.4562 3.69827 17.3134C4.04191 17.1624 4.55892 16.8884 4.97634 16.5729C5.18558 16.4147 5.34357 16.2655 5.44275 16.1374C5.51805 16.0402 5.53323 15.9894 5.53577 15.9809L5.53579 11.0456C5.53579 10.0375 5.584 8.34376 6.44026 6.89615C7.29017 5.45928 8.84944 4.39634 11.5001 4.27831V3C11.5001 2.72386 11.7239 2.5 12.0001 2.5ZM10.5423 18.75C10.6006 18.9857 10.7404 19.2042 10.9477 19.3769C11.2268 19.6095 11.6053 19.7402 12 19.7402C12.3947 19.7402 12.7732 19.6095 13.0523 19.3769C13.2596 19.2042 13.3994 18.9857 13.4577 18.75H10.5423ZM15.0071 6.59846C14.0853 5.87153 12.9755 5.69182 12.0598 5.765C12.0399 5.76659 12.02 5.76739 12.0001 5.76739C9.4711 5.76739 8.315 6.67302 7.73132 7.65981C7.10186 8.72398 7.03579 10.0443 7.03579 11.0456V15.9906C7.03579 16.4266 6.83311 16.7918 6.62883 17.0557C6.57718 17.1224 6.52191 17.1872 6.46395 17.25H17.2282C16.9631 16.7732 16.9639 16.3018 16.9643 16.0236L16.9644 15.9906V11.0789C16.7444 8.63667 15.9105 7.31087 15.0071 6.59846Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </header>
          <div className="flex justify-end mb-5 ">
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
          <div className="flex justify-between mb-5">
            <ul className="flex">
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
                <span>나의 오늘 일정</span>
                <div className="card_wrapper">
                  <div className="card">
                    <div className="card_upper">
                      <span>총 {data.mySchedule.lessonCount + data.mySchedule.counselingCount}건의 일정</span>
                      <br />
                      <span>
                        수업 {data.mySchedule.lessonCount}건, 상담 {data.mySchedule.counselingCount}건
                      </span>
                      <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM8 11C10.7 11 13.8 12.29 14 13V14H2V13.01C2.2 12.29 5.3 11 8 11ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                            fill="#CFCFCF"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="card_down">
                      <span>{data.mySchedule.lessonCount + data.mySchedule.counselingCount}</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <span>나의 회원</span>
                <div className="card_wrapper">
                  <div className="card">
                    <div className="card_upper">
                      <span>{data.center.memberCount}</span>
                      <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM8 11C10.7 11 13.8 12.29 14 13V14H2V13.01C2.2 12.29 5.3 11 8 11ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                            fill="#CFCFCF"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="card_down">
                      <span>{data.center.memberCount}</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <span>전체 직원</span>
                <div className="card_wrapper">
                  <div className="card">
                    <div className="card_upper">
                      <span>{data.center.staffCount}</span>
                      <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM8 11C10.7 11 13.8 12.29 14 13V14H2V13.01C2.2 12.29 5.3 11 8 11ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                            fill="#CFCFCF"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="card_down">
                      <span>{data.center.staffCount}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <BottomNav />
        </>
      )}
    </div>
  );
}

export default Main;
