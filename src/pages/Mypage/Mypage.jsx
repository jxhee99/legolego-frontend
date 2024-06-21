import styles from './Mypage.module.css';
import { useSearchParams } from 'react-router-dom';
import ProfileSetting from './ProfileSetting/ProfileSetting';
import DiyPriceList from './DiyPriceList/DiyPriceList';
import Sidebar from './Sidebar/Sidebar';

const Mypage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  return (
    <div className={styles.Mypage}>
      <Sidebar />
      <div className={styles.mypage_wrapper}>
        {tab === 'profile-setting' && <ProfileSetting />}
        {tab === 'my-diy-prices' && <DiyPriceList />}
      </div>
    </div>
  );
};

export default Mypage;
