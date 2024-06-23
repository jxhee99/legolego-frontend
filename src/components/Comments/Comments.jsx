import styles from './Comments.module.css';
import PropTypes from 'prop-types';

const Comments = ({ reviewContent, user }) => {
  return (
    <section className={styles.Comments}>
      <h3 className={styles.title}>LEGOLEGO 이용자 후기</h3>
      <div className={styles.image}></div>
      <p className={styles.content}>{reviewContent}</p>
      {user}
    </section>
  );
};

Comments.propTypes = {
  reviewContent: PropTypes.string.isRequired,
  user: PropTypes.element.isRequired,
};

export default Comments;
