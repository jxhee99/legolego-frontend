import styles from './ProductProcessCard.module.css';
import { formatDateTime } from '../../../utils/DateTime';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';

const ProductProcessCard = ({ productData }) => {
  const {
    productNum,
    productName,
    price,
    productImage,
    necessaryPeople,
    partnerName,
    route,
    orderCount,
  } = productData;

  const navigate = useNavigate();
  const progressPercentage = Math.min(
    (orderCount / necessaryPeople) * 100,
    100
  );

  // 문자열을 10글자로 제한하고 나머지는 ...으로 대체하는 함수
  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + '···';
    } else {
      return str;
    }
  };

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/product/${productNum}`)}
    >
      <div className={styles.image}>
        <img src={productImage} alt={productName} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{truncateString(productName, 13)}</h2>{' '}
        {/* 변경된 부분 */}
        <p className={styles.category}>{partnerName}</p>
        <p className={styles.price}>{price.toLocaleString()} 원</p>
        <p className={styles.deadline}>
          모집 기간:
          {formatDateTime(route.startDate).replace(/\s\d{2}:\d{2}$/, '')}~
          {formatDateTime(route.lastDate).replace(/\s\d{2}:\d{2}$/, '')}
        </p>
        <div className={styles.progressContainer}>
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            className={styles.progressBar}
          />
          <p className={styles.progressText}>
            {orderCount} / {necessaryPeople}명 참여
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductProcessCard;
