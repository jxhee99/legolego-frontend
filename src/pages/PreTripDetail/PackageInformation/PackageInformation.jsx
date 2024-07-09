import React from 'react';
import styles from './PackageInformation.module.css';
import { CalendarMonth, Person, LocationOn, Star } from '@mui/icons-material';
import { formatDateTime } from '../../../utils/DateTime';

const PackageInformation = ({
  productName,
  partnerName,
  price,
  productImage,
  recruitmentDeadline,
  necessaryPeople,
  rating,
}) => {
  return (
    <div className={styles.productContainer}>
      <div className={styles.imageSection}>
        <img
          src={productImage}
          alt={productName}
          className={styles.productImage}
        />
        <span className={styles.badge}>여행 완료</span>
      </div>
      <div className={styles.infoSection}>
        <h2 className={styles.productName}>{productName}</h2>
        <div className={styles.ratingContainer}>
          <Star className={styles.starIcon} />
          <span className={styles.rating}>{rating}</span>
          {/* TODO 동적으로 데이터 받아오기 */}
          <span className={styles.reviews}>(32 리뷰)</span>
        </div>
        <p className={styles.partnerName}>{partnerName}</p>

        <div className={styles.detailsContainer}>
          <div className={styles.detail}>
            <Person className={styles.icon} />
            <span>필요 인원: {necessaryPeople}명</span>
          </div>
          <div className={styles.detail}>
            <CalendarMonth className={styles.icon} />
            <span>마감일: {formatDateTime(recruitmentDeadline)}</span>
          </div>
          <div className={styles.priceContainer}>
            <span className={styles.price}>{price.toLocaleString()}원</span>
            <span className={styles.perPerson}>/ 1인</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageInformation;
