import styles from './CommentSection.module.css';
import Comment from './Comment';
import { useEffect, useState } from 'react';
import apiClient from '../../../api/apiClient';
import CardSlide from './CardSlide';
import TopReviewCardSlide from './TopReviewCardSlide';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CommentSection = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(9);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/pre-trip');
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * pageSize;
  const currentProducts = data.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <div className={`${styles.Comment} layout`}>
        <div className={styles.pretripComment}>
          <h2 className={styles.starText}>❤️‍🔥 별점 높은 여행을 볼까요? </h2>
          <TopReviewCardSlide />
          <h2 className={styles.slideText}>
            🍿 다른 여행이 어땠는지 궁금하신가요?{' '}
          </h2>

          <div>
            <CardSlide />
          </div>
          <div></div>
        </div>
        <div>
          <h2 className={styles.polaroid}>📸 지난 여행을 둘러보세요! </h2>
          <div className={styles.comments}>
            {currentProducts.map((comment) => (
              <Comment key={comment.boardNum} {...comment} />
            ))}
          </div>
          <Stack spacing={2} sx={{ mt: 4 }} alignItems="center">
            <Pagination
              count={Math.ceil(data.length / pageSize)}
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
