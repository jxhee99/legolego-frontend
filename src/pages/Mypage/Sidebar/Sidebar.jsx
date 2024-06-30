import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const location = useLocation();
  const currentTab = new URLSearchParams(location.search).get('tab');

  return (
    <aside className={styles.sidebar}>
      <h2>MY PAGE</h2>
      <ul>
        <li className={currentTab === 'profile-setting' ? styles.active : ''}>
          <Link to="/mypage?tab=profile-setting">프로필 변경</Link>
        </li>
        <li className={currentTab === 'order-summary' ? styles.active : ''}>
          <Link to="/mypage?tab=order-summary">주문내역</Link>
        </li>
        <li className={currentTab === 'my-diy-package' ? styles.active : ''}>
          <Link to="/mypage?tab=my-diy-package">내가 만든 DIY 패키지</Link>
        </li>
        <li className={currentTab === 'like-diy-package' ? styles.active : ''}>
          <Link to="/mypage?tab=like-diy-package">내가 응원한 DIY 패키지</Link>
        </li>
        <li className={currentTab === 'my-diy-prices' ? styles.active : ''}>
          <Link to="/mypage?tab=my-diy-prices">응원달성 DIY 패키지</Link>
        </li>
        <li className={currentTab === 'saved-packages' ? styles.active : ''}>
          <Link to="/mypage?tab=saved-packages">찜한 패키지</Link>
        </li>
        <li>
          <button>회원탈퇴</button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
