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

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
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
      <Link to="/">
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
