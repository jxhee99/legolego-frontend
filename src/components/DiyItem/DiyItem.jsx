import styles from './DiyItem.module.css';
import PropTypes from 'prop-types';

const DiyItem = ({ imageUrl }) => {
  return (
    <div className={styles.DiyItem}>
      <div className={styles.drag_handle}></div>
      <div className={styles.thumnail_image}>
        <img src={imageUrl} alt="썸네일 이미지" />
      </div>
      <div className={styles.description}>
        <input type="text" placeholder="제목을 입력하세요" />
        <input type="text" placeholder="내용을 입력하세요" />
      </div>
    </div>
  );
};

DiyItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default DiyItem;
