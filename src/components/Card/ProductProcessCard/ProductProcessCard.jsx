import React from 'react';
import styles from './ProductProcessCard.module.css';
import noneWhite from '../../../assets/images/none-white.png';
import { formatDateTime } from '../../../utils/DateTime';

const ProductProcessCard = ({
  productName,
  partnerName,
  price,
  productImage,
  recruitmentDeadline,
  productViewNum,
  wishlistCount,
  orderCount,
  necessaryPeople,
}) => {
  const progressPercentage = Math.min(
    (orderCount / necessaryPeople) * 100,
    100
  );

  const currentDate = new Date();
  const deadlineDate = new Date(recruitmentDeadline);
  const daysRemaining = Math.ceil((deadlineDate - currentDate) / (1000 * 60 * 60 * 24));

  return (
    <div className={styles.ProductProcessCard}>
      <div className={styles.imageContainer}>
        <img
          src={productImage || noneWhite}
          alt={productName}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.content_top}>
          <h2 className={styles.title}>{productName}</h2>
          {daysRemaining > 0 && daysRemaining <= 3 && (
            <button className={`${styles.button} ${styles.buttonUrgent}`}>마감 임박!</button>
          )}
          {daysRemaining <= 0 && (
            <button className={`${styles.button} ${styles.buttonClosed}`}>모집마감</button>
          )}
        </div>
        <p className={styles.price}>{price.toLocaleString()} 원</p>
        <p className={styles.text}>여행사:{partnerName}</p>
        <p className={styles.text}>여행 기간: </p>
        <p className={styles.text}>
          모집 기간 : {formatDateTime(recruitmentDeadline)}
        </p>
        <div className={styles.progressAndButtonContainer}>
          <div className={styles.progressContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${progressPercentage}%` }}
            ></div>
        <p className={styles.progressText}>
          {orderCount}/{necessaryPeople} 명 참여
        </p>
          </div>
          {/* {orderCount > necessaryPeople ? (
            <button className={`${styles.button} ${styles.buttonSuccess}`}>모집 성공</button>
          ) : (
            <button className={`${styles.button} ${styles.buttonOngoing}`}>모집중</button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProductProcessCard;