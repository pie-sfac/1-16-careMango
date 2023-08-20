import React from 'react';
import { useLocation } from 'react-router-dom';
import MainHeader from '@components/layout/MainHeader';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const pathName = location.pathname;

  let bgColor = '';
  if (pathName === '/schedule' || pathName === '/members' || pathName === '/staffs' || pathName === '/myPage') {
    bgColor = 'bg-bg-100';
  }

  return (
    <>
      <MainHeader />
      <main className={`pt-12 pb-24 base-px ${bgColor} min-h-screen overflow-auto box-border`}>{children}</main>
    </>
  );
};
export default Layout;
