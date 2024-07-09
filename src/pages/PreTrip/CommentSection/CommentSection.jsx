import styles from './CommentSection.module.css';
import Comment from './Comment';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CommentSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/pre-trip');
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
    {/* <div className={styles.commentBackground}>
      <div className={styles.commentText}>
      <p>다른 사람들이 다녀온 여행 후기를 볼 수 있어요</p></div>
    </div>
     */}
    <div className={`${styles.Comment} layout`}>
      <h2>지난 여행을 둘러보세요!</h2>
      <div className={styles.comments}>
        {data.map((comment) => (
          <Comment key={comment.boardNum} {...comment} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default CommentSection;