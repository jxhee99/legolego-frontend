import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <>
      <Header isLoggedIn={true} />
      <Outlet />
    </>
  );
};

export default Layout;
