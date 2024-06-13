import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <>
      <Header isLoggedIn={false} />
      <div className={styles.layout_style}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
