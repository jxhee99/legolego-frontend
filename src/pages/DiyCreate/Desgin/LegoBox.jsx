import React from 'react';
import styles from './Desgin.module.css';

const LegoBox = () => {
  return (
    <div className={styles.lego_box}>
      <p>
        <span>L</span>
        <span>E</span>
        <span>G</span>
        <span>O</span>
        <span>!</span>
        <span className={styles.span2}>L</span>
        <span className={styles.span2}>E</span>
        <span className={styles.span2}>G</span>
        <span className={styles.span2}>O</span>
        <span className={styles.span2}>!</span>
      </p>
    </div>
  );
};

export default LegoBox;
