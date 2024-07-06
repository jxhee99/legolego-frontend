import styles from './PackageMenu.module.css';

const PackageMenu = () => {
  return (
    <nav className={styles.packageMenu}>
      <ul className={styles.navLinks}>
        <li>
          <span>항공편</span>
        </li>
        <li>
          <span>여행 일정</span>
        </li>
      </ul>
    </nav>
  );
};

export default PackageMenu;
