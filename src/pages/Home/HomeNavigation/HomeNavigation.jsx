import React from 'react';
import styles from './HomeNavigation.module.css';

const HomeNavigation = () => {
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.HomeNavigation}>
      <ul>
        <li onClick={() => handleScrollToSection('package-section')}>상품</li>
        <li onClick={() => handleScrollToSection('diy-section')}>DIY</li>
        <li onClick={() => handleScrollToSection('review-section')}>여행후기</li>
      </ul>
    </div>
  );
};

export default HomeNavigation;
