import styles from './CommentSection.module.css';
import Comment from './Coment';

const CommentSection = ({ data }) => {
  return (
    <div className={styles.Comment}>
      <h2>여행 후기</h2>
      {data.map((comment) => (
        <Comment key={comment.boardNum} {...comment} />
      ))}
    </div>
  );
};

export default CommentSection;
