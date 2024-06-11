import styles from './Authentication.module.css';

const Authentication = ({ onClick }) => {
  return (
    <ul className={styles.Authentication} onClick={onClick}>
      <li className={styles.authentication_menu_item}>
        <button>로그인</button>
      </li>
      <li className={styles.authentication_menu_item}>
        <button>회원가입</button>
      </li>
    </ul>
  );
};

export default Authentication;
