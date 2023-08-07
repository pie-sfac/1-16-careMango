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

  return (
    <>
      {menu ? <MainHeader menu /> : <MainHeader />}
      <main className="pb-24 base-mx">{children}</main>
      <BottomNav />
    </>
  );
};
export default Layout;
