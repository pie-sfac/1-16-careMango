import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '@/atoms/user/userAtom';
import { ReactComponent as Logo } from '@/assets/icons/Logo.svg';
import { ReactComponent as Profile } from '@/assets/icons/Profile_24.svg';
import { ReactComponent as Notifications } from '@/assets/icons/Notifications.svg';
import { axiosInstance } from '@/utils/apiInstance';
import { accessTokenState } from '@/atoms/token/accessTokenAtom';

const MainHeader = () => {
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const toggleLogoutButton = useCallback(() => {
    setShowLogoutButton((prev) => !prev);
  }, []);

  const [isSubMenuOpen, setSubMenuOpen] = useState('');

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
    { id: 'Home', content: '홈', path: '/' },
    { id: 'Schedules', content: '일정관리', path: '/schedule' },
    { id: 'Members', content: '회원 관리', path: '/members' },
    {
      id: 'Center',
      content: '센터 관리',
      subMenu: [
        { id: 'Tickets', content: '수강권 관리', path: '/tickets/center' },
        { id: 'Staffs', content: '직원 관리', path: '/staffs' },
      ],
    },
    { id: 'MyPage', content: '마이페이지', path: '/myPage' },
  ];

  const getUserData = async () => {
    const res = await axiosInstance.get('me');
    setUser(res.data);
  };

  useEffect(() => {
    getUserData();
  }, [token]);

  return (
    <header className="fixed top-0 left-0 z-50 flex justify-between w-full p-4 py-3 bg-white border-b base-px border-line-200">
      {showLogoutButton && (
        <div className="absolute p-2 transform -translate-x-1/2 -translate-y-full bg-white border border-gray-300 rounded-md shadow-lg top-20 right-24">
          <button onClick={handleLogout} type="button">
            로그아웃
          </button>
        </div>
      )}
      <nav className="gap-8 flex-center">
        <button onClick={goMain} type="button">
          <Logo />
        </button>

        <ul className="gap-8 font-semibold cursor-pointer flex-center">
          {mainMenu.map(({ id, content, path, subMenu }) => (
            <li key={id} className="relative group" onMouseEnter={() => setSubMenuOpen(id)}>
              {!subMenu ? (
                <Link to={path} className="p-2 transition duration-300 rounded hover:bg-bg-100">
                  <span>{content}</span>
                </Link>
              ) : (
                <span className="p-2 transition duration-300 rounded hover:bg-bg-100">{content}</span>
              )}
              {subMenu && isSubMenuOpen === id && (
                <ul
                  className="absolute left-0 mt-2 bg-white border border-gray-300 rounded shadow-md w-28"
                  onMouseLeave={() => setSubMenuOpen('')}>
                  {subMenu.map(({ id: subId, content: subContent, path: subPath }) => (
                    <li key={subId}>
                      <Link to={subPath} className="block px-4 py-2 hover:bg-bg-100">
                        {subContent}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
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
