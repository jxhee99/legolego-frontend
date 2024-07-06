import styles from './PackageMenu.module.css';

const PackageMenu = ({ activeSection }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.packageMenu}>
      <ul className={styles.navLinks}>
        <li
          className={activeSection === 'airplane-info' ? styles.active : ''}
          onClick={() => scrollToSection('airplane-info')}
        >
          <span>항공편</span>
        </li>
        <li
          className={activeSection === 'schedule-info' ? styles.active : ''}
          onClick={() => scrollToSection('schedule-info')}
        >
          <span>여행 일정</span>
        </li>
      </ul>
    </nav>
  );
};

export default PackageMenu;
