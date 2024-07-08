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
          <button className={styles.button}>마감 임박!</button>
        </div>
        <p className={styles.category}>{partnerName}</p>
        <p className={styles.price}>{price.toLocaleString()} 원</p>
        <p className={styles.date}>
          모집 기간 :{formatDateTime(recruitmentDeadline)}
        </p>
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <p className={styles.progressText}>
            {orderCount}/{necessaryPeople} 명 참여
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductProcessCard;
