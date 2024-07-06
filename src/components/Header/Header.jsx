import { useState, useContext, useEffect } from 'react';
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
  const { isAuthenticated, logout, userNum, role } = useContext(AuthContext);
  const [toggleAuthentication, setToggleAuthentication] = useState({
    logIn: false,
    signUp: false,
  });
  const [isFixed, setIsFixed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    navigate('/home'); // Redirect to home page after logout
  };

  return (
    <header
      className={`${styles.Header} ${isFixed ? styles.HeaderFixed : ''} ${toggleAuthentication.logIn || toggleAuthentication.signUp ? styles.AuthOpen : ''}`}
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
          <Notification role={role} userNum={userNum} />
          {/* Pass role and userNum to Notification component */}
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
