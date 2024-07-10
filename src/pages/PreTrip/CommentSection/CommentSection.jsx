import styles from './CommentSection.module.css';
import Comment from './Comment';
import { useEffect, useState } from 'react';
import apiClient from '../../../api/apiClient';
import CardSlide from './CardSlide';
import TopReviewCardSlide from './TopReviewCardSlide';


const CommentSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/pre-trip');
        console.log(response);
        setData(response.data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

  }, []);

  return (

    <div>

    <div className={`${styles.Comment} layout`}>
          <div className={styles.pretripComment}>
          <h2 className={styles.starText}>❤️‍🔥 별점 높은 여행을 볼까요? </h2>
      <TopReviewCardSlide/>
          <h2 className={styles.slideText}>🍿 다른 여행이 어땠는지 궁금하신가요? </h2>
         
          <div>
      <CardSlide/>
          </div>
          <div>
      </div>
          </div>
      <div>
      <h2 className={styles.polaroid}>📸 지난 여행을 둘러보세요! </h2>
      <div className={styles.comments}>
        {data.map((comment) => (
          <Comment key={comment.boardNum} {...comment} />
        ))}
      </div>
      </div>
    </div>
    </div>
  );
};

export default CommentSection;