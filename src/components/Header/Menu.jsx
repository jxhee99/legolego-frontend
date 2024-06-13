import styles from './Menu.module.css';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../Routes/route';

const Menu = () => {
  return (
    <ul className={styles.Menu}>
      <li className={styles.menu_item}>
        <Link to={ROUTE.ABOUT.link}>About</Link>
      </li>
      <li className={styles.menu_item}>
        <Link to={ROUTE.HOME.link}>홈</Link>
      </li>
      <li className={styles.menu_item}>
        <Link to={ROUTE.PACKAGE.link}>패키지</Link>
      </li>
      <li className={styles.menu_item}>
        <Link to={ROUTE.DIY.link}>DIY</Link>
      </li>
      <li className={styles.menu_item}>
        <Link to={ROUTE.REVIEW.link}>후기</Link>
      </li>
    </ul>
  );
};

export default Menu;
