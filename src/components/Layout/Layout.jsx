import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import PartnerHeader from '../Header/PartnerHeader';

const Layout = () => {
  const userRole = localStorage.getItem('role');
  return (
    <>
      {userRole === 'PARTNER' ? (
        <PartnerHeader />
      ) : (
        <Header isLoggedIn={false} />
      )}

      <Outlet />
    </>
  );
};

export default Layout;
