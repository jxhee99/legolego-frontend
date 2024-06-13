import styles from './DiyCard.module.css';
import PropTypes from 'prop-types';

const DiyCard = ({ imageUrl, title, user }) => {
  return (
    <div className={styles.DiyCard}>
      <div className={styles.thumnail_image}>
        <img src={imageUrl} alt="패키지 썸네일" />
      </div>
      <h4>{title}</h4>
      {user}
    </div>
  );
};

DiyCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.element.isRequired,
};

export default DiyCard;
