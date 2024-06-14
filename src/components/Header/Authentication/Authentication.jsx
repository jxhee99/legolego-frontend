import PropTypes from 'prop-types';
import styles from '../Header.module.css';

const Authentication = ({ onClickLogin, onClickSignUp }) => {
  return (
    <ul className={styles.Authentication}>
      <li>
        <button onClick={onClickLogin}>로그인</button>
      </li>
      <li>
        <button onClick={onClickSignUp}>회원가입</button>
      </li>
    </ul>
  );
};

Authentication.propTypes = {
  onClickLogin: PropTypes.func.isRequired,
  onClickSignUp: PropTypes.func.isRequired,
};

export default Authentication;
