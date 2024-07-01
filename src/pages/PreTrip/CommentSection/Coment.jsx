import styles from './CommentSection.module.css';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../../utils/DateTime';

const Comment = ({
  boardNum,
  productImage,
  productName,
  price,
  boardingDate,
  comingDate,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.comment_container}>
      <div
        className={styles.comment_box}
        onClick={() => navigate(`/preTrip-detail/${boardNum}`)}
      >
        <div className={styles.comment_contents}>
          <img src={productImage} alt="" />
        </div>
        <div>
          <h3 className={styles.comment_text}>{productName}</h3>
          <div className={styles.comment_details}>
            <p>
              {formatDateTime(boardingDate).replace(/\s\d{2}:\d{2}$/, '')} ~{' '}
              {formatDateTime(comingDate).replace(/\s\d{2}:\d{2}$/, '')}
            </p>
            <p>{price}₩</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
