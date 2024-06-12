// Header.jsx
import styles from './Header.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
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

  const onClickButton = (e) => {
    const { textContent } = e.target;
    if (textContent === '로그인') {
      setToggleAuthentication((prev) => ({
        ...prev,
        logIn: !prev.logIn,
      }));
    } else if (textContent === '회원가입') {
      setToggleAuthentication((prev) => ({
        ...prev,
        signUp: !prev.signUp,
      }));
    } else {
      throw new Error('동작이 정상적으로 수행되지 않았습니다.');
    }
  };

  return (
    <header className={styles.Header}>
      <Logo />
      <Menu />
      {!isLoggedIn ? (
        <>
          <Authentication onClick={onClickButton} />
        </>
      ) : (
        <button>마이페이지</button>
      )}
      {toggleAuthentication.logIn && <LogIn />}
      {toggleAuthentication.signUp && <SignUp />}
    </header>
  );
};

Header.propTypes = {
  /** 로그인 여부 */
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
