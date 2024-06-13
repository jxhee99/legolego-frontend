import styles from './Menu.module.css';

const Menu = () => {
  return (
    <ul className={styles.Menu}>
      <li className={styles.menu_item}>About</li>
      <li className={styles.menu_item}>홈</li>
      <li className={styles.menu_item}>패키지</li>
      <li className={styles.menu_item}>DIY</li>
      <li className={styles.menu_item}>후기</li>
    </ul>
  );
};

export default Menu;
