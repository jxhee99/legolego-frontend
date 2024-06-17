import styles from './Mypage.module.css';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';

const Mypage = () => {
  return (
    <div className={styles.Mypage}>
      {/* <Sidebar /> */}
      <Outlet></Outlet>
    </div>
  );
};

export default Mypage;
