import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

// components
import Logo from '../Logo/Logo';
import Menu from './Menu/Menu';
import Authentication from './Authentication/Authentication';
import LogIn from './Authentication/LogIn';
import SignUp from './Authentication/SignUp';

const Header = ({ isLoggedIn }) => {
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

  return (
    <header
      className={`${styles.Header} ${toggleAuthentication.logIn || toggleAuthentication.signUp ? styles.AuthOpen : ''}`}
    >
      <Link to="/">
        <Logo />
      </Link>
      <Menu />
      {!isLoggedIn ? (
        <Authentication
          onClickLogin={() => handleToggleAuthentication('logIn')}
          onClickSignUp={() => handleToggleAuthentication('signUp')}
        />
      ) : (
        <button onClick={moveToMypage}>마이페이지</button>
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
