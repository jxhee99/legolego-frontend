import styles from './ProductProcessCard.module.css';
import { formatDateTime } from '../../../utils/DateTime';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';

const ProductProcessCard = ({
  productNum,
  productName,
  price,
  productImage,
  recruitmentDeadline,
  necessaryPeople,
  orderCount,
  partnerName,
}) => {
  const navigate = useNavigate();
  const progressPercentage = Math.min(
    (orderCount / necessaryPeople) * 100,
    100
  );
  console.log(orderCount);

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/product/${productNum}`)}
    >
      <div className={styles.image}>
        <img src={productImage} alt={productName} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{productName}</h2>
        <p className={styles.category}>{partnerName}partnerName 추가해주세요</p>
        <p className={styles.price}>{price.toLocaleString()} 원</p>
        <p className={styles.deadline}>
          모집 기간: {formatDateTime(recruitmentDeadline)} ~ 모집기간
          추가해주세요
        </p>
        <div className={styles.progressContainer}>
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            className={styles.progressBar}
          />
          <p className={styles.progressText}>
            orderCount 추가해주세요 / necessaryPeople 추가해주세요
          </p>
          {/* <p className={styles.progressText}>
          orderCount 추가해주세요  {orderCount} / {necessaryPeople}명 참여
          </p> */}
        </div>
      </div>
      <span className={styles.badge}>마감 임박!</span>
    </div>
  );
};

export default ProductProcessCard;
