import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '@/atoms/user/userAtom';
import { ReactComponent as Logo } from '@/assets/icons/Logo.svg';
import { ReactComponent as Profile } from '@/assets/icons/Profile_24.svg';
import { ReactComponent as Notifications } from '@/assets/icons/Notifications.svg';
import { axiosInstance } from '@/utils/apiInstance';
import { accessTokenState } from '@/atoms/token/accessTokenAtom';

type MainHeaderProps = {
  menu?: boolean;
};

const MainHeader = ({ menu }: MainHeaderProps) => {
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const toggleLogoutButton = useCallback(() => {
    setShowLogoutButton((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    // API를 통해 로그아웃 요청
    fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          localStorage.clear();
          window.location.reload();
        } else {
          console.error('로그아웃 요청 실패');
        }
      })
      .catch((error) => {
        console.error('로그아웃 요청 중 에러 발생:', error);
      });
  }, []);

  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const goMain = () => {
    navigate('/');
  };
  const token = useRecoilValue(accessTokenState);

  const mainMenu = [
    { id: 'Members', content: '직원 관리', path: '/staffs' },
    { id: 'Tickets', content: '수강권 관리', path: '/tickets/centerTicket' },
  ];
  // 마이 페이지 메뉴 항목 설정
  const myPageMenu = [
    { id: 'MyInfo', content: '내 정보', path: '/myPage/myInfo' },
    { id: 'Notices', content: '공지사항', path: '/myPage/notices' },
    { id: 'AppSettings', content: '앱 설정', path: '/myPage/appSettings' },
    { id: 'OperatingData', content: '운영 데이터', path: '/myPage/operatingData' },
  ];

  // 현재 경로에 따라 메뉴 항목을 결정
  const currentMenu = useLocation().pathname.includes('/myPage') ? myPageMenu : mainMenu;

  const getUserData = async () => {
    const res = await axiosInstance.get('me');
    setUser(res.data);
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <header className="fixed top-0 left-0 flex justify-between w-full p-4 py-3 bg-white border-b base-px border-line-200">
      {showLogoutButton && (
        <div className="absolute top-20 right-24 transform -translate-x-1/2 -translate-y-full p-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <button onClick={handleLogout} type="button">
            로그아웃
          </button>
        </div>
      )}
      <nav className="gap-8 flex-center">
        <button onClick={goMain} type="button">
          <Logo />
        </button>

        {menu && (
          <ul className="gap-8 font-semibold cursor-pointer flex-center">
            {currentMenu.map(({ id, content, path }) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
              <li key={id} onClick={() => navigate(path)}>
                {content}
              </li>
            ))}
          </ul>
        )}
      </nav>

      <div className="flex-center">
        <div
          className="flex items-center after:content-['|'] after:float-right after:block after:text-line-200
        before:content-['|'] before:float-right before:block before:text-line-200">
          <button type="button" className="ml-4" onClick={toggleLogoutButton}>
            <Profile />
          </button>
          <p className="mx-2 text-base" onClick={toggleLogoutButton}>
            {user?.name}
          </p>
          <span className="px-2 py-1 mr-4 text-xs rounded-md bg-bg-100 text-primary-500">
            {user?.active && '플랜 이용중'}
          </span>
        </div>
        <button type="button" className="ml-3">
          <Notifications />
        </button>
      </div>
    </header>
  );
};
export default MainHeader;
