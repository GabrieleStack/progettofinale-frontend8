import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './Navbar.js';

const NavbarLayout = ({ children, onSearch, cartTotal }) => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';
  const showSearch = location.pathname === '/';

  console.log("NavbarLayout Cart Total:", cartTotal);

  return (
    <>
      {!isAdminPage && <NavBar onSearch={onSearch} showSearch={showSearch} cartTotal={cartTotal} />}
      {children}
    </>
  );
};

export default NavbarLayout;
