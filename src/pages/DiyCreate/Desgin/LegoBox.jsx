import React from 'react';
import styles from './Design.module.css';

const LegoBox = () => {
  return (
    <div className={styles.lego_box}>
      <div>
        <img
          src="/src/assets/images/lego_yellow.png"
          className={`${styles.lego_yellow} ${styles.bounceImage}`}
        ></img>
        <span className={styles.bounceText}>L</span>
        <img
          src="/src/assets/images/lego_blue.png"
          className={`${styles.lego_blue} ${styles.bounceImage}`}
        ></img>
        <span className={styles.bounceText}>E</span>
        <img
          src="/src/assets/images/lego_red.png"
          className={`${styles.lego_red} ${styles.bounceImage}`}
        ></img>
        <span className={styles.bounceText}>G</span>
        <span className={styles.bounceText}>O</span>
        <span className={styles.bounceText}>!</span>
        <span className={styles.bounceText}>L</span>
        <span className={styles.bounceText}>E</span>
        <span className={styles.bounceText}>G</span>
        <span className={styles.bounceText}>O</span>
        <span className={styles.bounceText}>!</span>
      </div>
    </div>
  );
};

export default LegoBox;
