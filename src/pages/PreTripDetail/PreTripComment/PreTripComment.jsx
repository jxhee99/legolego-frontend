import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import styles from './PreTripComment.module.css';
import { formatDateTime } from '../../../utils/DateTime';
import { useState } from 'react';

const PreTripComment = ({ reviews }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className={styles.reviewSection}>
      <h2 className={styles.reviewTitle}>여행 후기</h2>
      <div className={styles.reviewGrid}>
        {reviews.map((review, index) => (
          <article
            className={`${styles.reviewCard} ${hoveredIndex === index ? styles.hovered : ''}`}
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <header className={styles.reviewHeader}>
              <h3 className={styles.reviewAuthor}>{review.userNickname}</h3>
              <time className={styles.reviewDate}>
                {formatDateTime(review.createDate).replace(
                  /\s\d{2}:\d{2}$/,
                  ''
                )}
              </time>
            </header>
            <div className={styles.reviewContent}>
              <p>{review.content}</p>
            </div>
            <footer className={styles.reviewFooter}>
              <Rating name="read-only" value={review.rating} readOnly />
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PreTripComment;
