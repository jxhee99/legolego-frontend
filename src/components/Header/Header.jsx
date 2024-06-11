import styles from './Header.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo/Logo';
import Menu from './Menu';
import Authentication from './Authentication';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';

const Header = ({ isLoggedIn }) => {
  const [clickedButton, setClickedButton] = useState(null);
  const onClickButton = (e) => {
    if (e.target.textContent === '로그인') {
      setClickedButton('로그인');
    } else {
      setClickedButton('회원가입');
    }
  };

  return (
    <header className={styles.Header}>
      <Logo />
      <Menu />
      {!isLoggedIn ? (
        <Authentication onClick={onClickButton} />
      ) : (
        <button>마이페이지</button>
      )}
      {clickedButton === '로그인' && <Login />}
      {clickedButton === '회원가입' && <Signup />}
    </header>
  );
};

Header.propTypes = {
  /** 로그인 여부 */
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
