import styles from './PackageCard.module.css';
import PropTypes from 'prop-types';

const PackageCard = ({ imageUrl, title, partnerName }) => {
  return (
    <div className={styles.PackageCard}>
      <div className={styles.package_card_thumbnail}>
        <img src={imageUrl} alt="패키지 썸네일" />
      </div>
      <div className={styles.package_card_body}>
        <span>{partnerName}</span>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

PackageCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  partnerName: PropTypes.string.isRequired,
};

export default PackageCard;
