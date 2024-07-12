import styles from '../Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { ROUTE } from '../../../Routes/route';

const Menu = () => {
  const location = useLocation();

  return (
    <ul className={styles.Menu}>
      <li
        className={`${styles.menu_item} ${location.pathname === ROUTE.ABOUT.link ? styles.active : ''}`}
      >
        <Link to={ROUTE.ABOUT.link}>About</Link>
      </li>
      <li
        className={`${styles.menu_item} ${location.pathname === ROUTE.HOME.link ? styles.active : ''}`}
      >
        <Link to={ROUTE.HOME.link}>Home</Link>
      </li>
      <li
        className={`${styles.menu_item} ${location.pathname === ROUTE.PRODUCT.link ? styles.active : ''}`}
      >
        <Link to={ROUTE.PRODUCT.link}>패키지상품</Link>
      </li>
      <li
        className={`${styles.menu_item} ${location.pathname === ROUTE.DIY.link ? styles.active : ''}`}
      >
        <Link to={ROUTE.DIY.link}>DIY</Link>
      </li>
      <li
        className={`${styles.menu_item} ${location.pathname === ROUTE.PRE_TRIP.link ? styles.active : ''}`}
      >
        <Link to={ROUTE.PRE_TRIP.link}>지난여행</Link>
      </li>
      <li
        className={`${styles.menu_item} ${location.pathname === ROUTE.BOARD.link ? styles.active : ''}`}
      >
        <Link to={ROUTE.BOARD.link}>커뮤니티</Link>
      </li>
    </ul>
  );
};

export default Menu;
