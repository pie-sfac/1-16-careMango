import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/icons/Logo.svg';
import { ReactComponent as Back } from '../../assets/icons/Back.svg';
import { ReactComponent as Profile } from '../../assets/icons/Profile_24.svg';
import { ReactComponent as Notifications } from '../../assets/icons/Notifications.svg';

type MainHeaderProps = {
  menu?: boolean;
};

const MainHeader = ({ menu }: MainHeaderProps) => {
  const navigate = useNavigate();
  const goMain = () => {
    navigate('/main');
  };

  const mainMenu = [
    // { id: 'Home', content: '홈', path: '/' },
    // { id: 'Schedule', content: '일정관리', path: '/schedule' },
    // { id: 'Member', content: '회원관리', path: '/members' },
    // { id: 'Center', content: '센터관리', path: '/tickets/centerTicket' },
    // { id: 'Mypage', content: '마이페이지', path: '/mypage' },

    { id: 'Members', content: '직원 관리', path: '/members' },
    { id: 'Tickets', content: '수강권 관리', path: '/tickets/centerTicket' },
  ];

  return (
    <header className="flex justify-between py-3 border-b border-line-200">
      <nav className="gap-8 flex-center">
        <button onClick={goMain} type="button">
          <Logo />
        </button>

        <ul className="gap-8 font-semibold cursor-pointer flex-center">
          {mainMenu.map(({ id, content, path }) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <li key={id} onClick={() => navigate(path)}>
              {content}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-center">
        <div
          className="flex items-center after:content-['|'] after:float-right after:block after:text-line-200
        before:content-['|'] before:float-right before:block before:text-line-200">
          <button type="button" className="ml-4">
            <Profile />
          </button>
          <p className="mx-2 text-base">관리자01</p>
          <span className="px-2 py-1 mr-4 text-xs rounded-md bg-bg-100 text-primary-500">플랜 이용중</span>
        </div>
        <button type="button" className="ml-3">
          <Notifications />
        </button>
      </div>
    </header>
  );
};
export default MainHeader;
