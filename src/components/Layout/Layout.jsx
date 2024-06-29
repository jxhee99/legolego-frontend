import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import HeaderPartner from '../Header/HeaderPartner';
import HeaderAdmin from '../Header/HeaderAdmin';

const Layout = () => {
  const userRole = localStorage.getItem('role');

  const renderHeader = () => {
    if (userRole === 'ADMIN') {
      return <HeaderAdmin />;
    } else if (userRole === 'PARTNER') {
      return <HeaderPartner />;
    } else {
      return <Header isLoggedIn={false} />;
    }
  };

  return (
    <>
      {renderHeader()}
      <Outlet />
    </>
  );
};

export default Layout;
