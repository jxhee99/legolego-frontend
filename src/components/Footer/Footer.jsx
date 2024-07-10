import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer_box}>
        <div className={styles.text_box}>
          <h4>Developers</h4>
          <p>김주희</p>
          <p>김현진</p>
          <p>이효정</p>
          <p>정세은</p>
          <p>조예린</p>
        </div>
        <div className={styles.text_box}>
          <h4>Stacks</h4>
          <p>React</p>
          <p>Spring Boot</p>
          <p>MariaDB</p>
          <p>Redis</p>
          <p>AWS</p>
        </div>
        <div className={styles.text_box}>
          <h4>Git Hub</h4>
          <p>legolego-project</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
