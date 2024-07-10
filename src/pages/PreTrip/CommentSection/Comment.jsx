import styles from './CommentSection.module.css';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../../utils/DateTime';
import none from '../../../assets/images/none.jpg';


const Comment = ({
  boardNum,
  productImage,
  productName,
  price,
  boardingDate,
  comingDate,
  destination,
  avgRating
}) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const roundedRating = Math.round(rating);
    if (roundedRating === 0) {
      return '💫';
    }
    return '⭐️'.repeat(roundedRating);
  };



  return (
    <div className={styles.comment_box} onClick={() => navigate(`/preTrip-detail/${boardNum}`)}>
      <div className={`${styles.card_face} ${styles.front}`}>
        <div className={styles.comment_contents}>
          <img src={productImage || none} alt="썸네일" />
        </div>
        <div className={styles.comment_details}>
          <p className={styles.comment_text}>#{productName}</p>
          <p>{destination.split('/')[0]}</p>
          <p>{formatDateTime(boardingDate).replace(/\s\d{2}:\d{2}$/, '')} ~ {formatDateTime(comingDate).replace(/\s\d{2}:\d{2}$/, '')}</p>
        </div>
      </div>
      <div className={`${styles.card_face} ${styles.back}`}>
      <div className={styles.black}>
        <p className={styles.hover_textTitle}>{productName}</p>
        <p className={styles.hover_textStar}>{renderStars(avgRating)}({avgRating.toFixed(1)})</p> {/* 리뷰 별점 가져오기 */}
        <p className={styles.hover_text}>{destination.split('/')[0]}</p>
        <p className={styles.hover_text}>{formatDateTime(boardingDate).replace(/\s\d{2}:\d{2}$/, '')} ~ {formatDateTime(comingDate).replace(/\s\d{2}:\d{2}$/, '')}</p>
        <p className={styles.hover_text}>₩ {price}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
