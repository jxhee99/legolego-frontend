import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

// components
import Logo from '../Logo/Logo';
import Menu from './Menu/Menu';
import Authentication from './Authentication/Authentication';
import LogIn from './Authentication/LogIn';
import SignUp from './Authentication/SignUp';
import { AuthContext } from '../../contexts/AuthContext';

import Notification from './WebSocket/Notification';

const Header = () => {
  const { isAuthenticated, logout, userNum, role } = useContext(AuthContext); // role 추가
  const [toggleAuthentication, setToggleAuthentication] = useState({
    logIn: false,
    signUp: false,
  });
  const navigate = useNavigate();

  const handleToggleAuthentication = (type) => {
    setToggleAuthentication((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const closeAuthentication = () => {
    setToggleAuthentication({
      logIn: false,
      signUp: false,
    });
  };

  const moveToMypage = () => {
    navigate('/mypage?tab=profile-setting');
  };

  const handleLogout = () => {
    logout();
    navigate('/home'); // 로그아웃 후 홈 페이지로 리디렉션
  };

  return (
    <header
      className={`${styles.Header} ${toggleAuthentication.logIn || toggleAuthentication.signUp ? styles.AuthOpen : ''}`}
    >
      <Link to="/home">
        <Logo />
      </Link>
      <Menu />
      {!isAuthenticated ? (
        <Authentication
          onClickLogin={() => handleToggleAuthentication('logIn')}
          onClickSignUp={() => handleToggleAuthentication('signUp')}
        />
      ) : (
        <div>
          <Notification role={role} userNum={userNum} />{' '}
          {/* Notification 컴포넌트에 role과 userNum 전달 */}
          <button onClick={moveToMypage}>마이페이지</button>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      )}
      {toggleAuthentication.logIn && <LogIn onClose={closeAuthentication} />}
      {toggleAuthentication.signUp && <SignUp onClose={closeAuthentication} />}
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
