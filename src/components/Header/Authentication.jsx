import styles from './Authentication.module.css';

const Authentication = () => {
  return (
    <ul className={styles.Authentication}>
      <li className={styles.menu_item}>로그인</li>
      <li className={styles.menu_item}>회원가입</li>
    </ul>
  );
};

export default Authentication;
