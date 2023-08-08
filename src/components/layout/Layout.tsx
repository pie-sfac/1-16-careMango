import React from 'react';
import { useLocation } from 'react-router-dom';
import MainHeader from './MainHeader';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const pathName = location.pathname;

  let menu = false;
  if (pathName.includes('/tickets') || pathName.includes('/staffs') || pathName.includes('/myPage')) {
    menu = true;
  }
  let bgColor = '';
  if (pathName === '/schedule' || pathName === '/members' || pathName === '/staffs') {
    bgColor = 'bg-bg-100';
  }

  return (
    <>
      {menu ? <MainHeader menu /> : <MainHeader />}
      <main className={`pt-12 pb-24 base-px ${bgColor} min-h-screen overflow-auto box-border`}>{children}</main>
      <BottomNav />
    </>
  );
};
export default Layout;
