import styles from './CommentSection.module.css';
import Comment from './Coment';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CommentSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/pre-trip');
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={`${styles.Comment} layout`}>
      <h2>지난 여행을 둘러보세요!</h2>
      {data.map((comment) => (
        <Comment key={comment.boardNum} {...comment} />
      ))}
    </div>
  );
};

export default CommentSection;
