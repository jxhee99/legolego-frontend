import styles from './Review.module.css';

const Review = ({ reviewTitle, reviewContent }) => {
  return (
    <div className={styles.Review}>
      <h4>{reviewTitle}</h4>
      <p>{reviewContent}</p>
    </div>
  );
};

export default Review;
