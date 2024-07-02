import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import styles from './PreTripComment.module.css';
import { formatDateTime } from '../../../utils/DateTime';

const PreTripComment = ({ reviews }) => {
  return (
    <div className={styles.PreTripComment}>
      <h2>여행 후기</h2>
      <div className={styles.PreTripCards}>
        {/* TODO 컴포넌트 분리하기 */}
        {reviews.map((review, index) => (
          <div className={styles.comment} key={index}>
            <div className={styles.authorDate}>
              <p className={styles.author}>{review.userNickname}</p>
              <p className={styles.date}>
                {formatDateTime(review.createDate).replace(
                  /\s\d{2}:\d{2}$/,
                  ''
                )}
              </p>
            </div>
            <div className={styles.content}>
              <p>{review.content}</p>
              <Box>
                <Rating name="read-only" value={review.rating} readOnly />
              </Box>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreTripComment;
