import styles from './Review.module.css';
import PropTypes from 'prop-types';

const Review = ({ reviewContent, user }) => {
  return (
    <section className={styles.Review}>
      <h3 className={styles.title}>LEGOLEGO 이용자 후기</h3>
      <div className={styles.image}></div>
      <p className={styles.content}>{reviewContent}</p>
      {user}
    </section>
  );
};

Review.propTypes = {
  reviewContent: PropTypes.string.isRequired,
  user: PropTypes.element.isRequired,
};

export default Review;
