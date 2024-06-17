import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className={styles.Sidebar}>
      <h2>MY PAGE</h2>
      <ul>
        <li>
          <Link to="/mypage/profile-setting">프로필 변경</Link>
        </li>
        <li>
          <Link to="/mypage/order-summary">주문내역</Link>
        </li>
        <li>
          <Link to="/mypage/my-diy-package">내가 만든 DIY 패키지</Link>
        </li>
        <li>
          <Link to="/mypage/saved-packages">찜한 패키지</Link>
        </li>
        <li>
          <button>회원탈퇴</button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
