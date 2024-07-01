import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import styles from './PreTripComment.module.css';
import { useState } from 'react';

const PreTripComment = () => {
  const [value, setValue] = useState(2);

  return (
    <div className={styles.PreTripCard}>
      <h2>여행 후기</h2>
      <div className={styles.comment}>
        <div className={styles.authorDate}>
          <p className={styles.author}>짱구</p>
          <p className={styles.date}>2024-06-27</p>
        </div>
        <div>
          <p>가성비 여행최고!</p>
          <Box>
            <Rating name="read-only" value={value} readOnly />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default PreTripComment;
