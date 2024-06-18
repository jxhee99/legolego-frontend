import styles from './Mypage.module.css';
import { useSearchParams } from 'react-router-dom';
import ProfileSetting from './ProfileSetting/ProfileSetting';
import LikedOver from './OverLikedPackage/OverLiked';
import Sidebar from './Sidebar/Sidebar';

const Mypage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  return (
    <div className={styles.Mypage}>
      <Sidebar />
      <div className={styles.mypage_wrapper}>
        {tab === 'profile-setting' && <ProfileSetting />}
        {tab === 'my-overliked-packages' && <LikedOver />}
      </div>
    </div>
  );
};

export default Mypage;
