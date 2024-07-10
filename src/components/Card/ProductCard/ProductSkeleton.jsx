import React from 'react';
import styles from './ProductSkeleton.module.css';

const ProductSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>
      <div className={styles.text}></div>
      <div className={styles.text}></div>
      <div className={styles.text}></div>
    </div>
  );
};

export default ProductSkeleton;
