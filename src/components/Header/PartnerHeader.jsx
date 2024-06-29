import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from './Menu/Menu';
import styles from './Header.module.css';

// components
import Logo from '../Logo/Logo';
import { AuthContext } from '../../contexts/AuthContext';

const PartnerHeader = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const moveToPartner = () => {
    navigate('/partner');
  };

  const handleLogout = () => {
    logout();
    navigate('/home'); // 로그아웃 후 홈 페이지로 리디렉션
  };

  return (
    <header className={styles.Header}>
      <Link to="/">
        <Logo />
      </Link>
      <Menu />
      <div>
        <button onClick={moveToPartner}>파트너</button>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </header>
  );
};

export default PartnerHeader;
