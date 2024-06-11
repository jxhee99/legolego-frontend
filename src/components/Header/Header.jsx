import styles from './Header.module.css';
import PropTypes from 'prop-types';

const Header = ({ logo, Menu, authentication, isLoggedIn }) => {
  return (
    <header className={styles.Header}>
      <div className={styles.logo}>{logo}</div>
      <div className={styles.Menu}>{Menu}</div>
      {!isLoggedIn ? (
        <div className={styles.authentication}>{authentication}</div>
      ) : (
        <button>마이페이지</button>
      )}
    </header>
  );
};

Header.propTypes = {
  logo: PropTypes.element.isRequired,
  Menu: PropTypes.element.isRequired,
  authentication: PropTypes.element.isRequired,
  /** 로그인 여부 */
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
