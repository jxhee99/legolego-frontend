import styles from './PackageCard.module.css';
import PropTypes from 'prop-types';

const PackageCard = ({ imageUrl, title, user }) => {
  return (
    <div className={styles.PackageCard}>
      <div className={styles.thumnail_image}>
        <img src={imageUrl} alt="패키지 썸네일" />
      </div>
      <h4>{title}</h4>
      {user}
    </div>
  );
};

PackageCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.element.isRequired,
};

export default PackageCard;
