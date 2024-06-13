import styles from './DiyCard.module.css';
import PropTypes from 'prop-types';

const DiyCard = ({ page, imageUrl, title, userName, user }) => {
  return (
    <div className={styles.DiyCard}>
      {page && <p>{userName}님의 여행 둘러보세요!</p>}
      <div className={styles.diy_card_thumbnail}>
        <img src={imageUrl} alt="DIY패키지 썸네일" />
      </div>
      <h4>{title}</h4>
      {user}
    </div>
  );
};

DiyCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default DiyCard;
