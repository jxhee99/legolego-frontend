import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside>
      <h2>MY PAGE</h2>
      <ul>
        <li>
          <Link to="/mypage?tab=profile-setting">프로필 변경</Link>
        </li>
        <li>
          <Link to="/mypage?tab=order-summary">주문내역</Link>
        </li>
        <li>
          <Link to="/mypage?tab=my-diy-package">내가 만든 DIY 패키지</Link>
        </li>
        <li>
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
