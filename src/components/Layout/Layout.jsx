import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import HeaderPartner from '../Header/HeaderPartner';
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer';

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
      <Footer />
    </>
  );
};

export default Layout;
