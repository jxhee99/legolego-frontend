// Header.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import Logo from '../Logo/Logo';
import Menu from './Menu';
import Authentication from './Authentication';
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';

const Header = ({ isLoggedIn }) => {
  const [toggleAuthentication, setToggleAuthentication] = useState({
    logIn: false,
    signUp: false,
  });

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

  return (
    <header
      className={`${styles.Header} ${toggleAuthentication.logIn || toggleAuthentication.signUp ? styles.AuthOpen : ''}`}
    >
      <Logo />
      <Menu />
      {!isLoggedIn ? (
        <Authentication
          onClickLogin={() => handleToggleAuthentication('logIn')}
          onClickSignUp={() => handleToggleAuthentication('signUp')}
        />
      ) : (
        <button>마이페이지</button>
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
