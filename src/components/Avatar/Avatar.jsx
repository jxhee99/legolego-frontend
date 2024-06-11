import styles from './Avatar.module.css';
import PropTypes from 'prop-types';

const Avatar = ({ nickname, imageUrl }) => {
  return (
    <div className={styles.Avatar}>
      <div className={styles.avatar_image}>
        <img src={imageUrl} alt={`${nickname}의 프로필`} />
      </div>
      <span>{nickname}</span>
    </div>
  );
};

Avatar.propTypes = {
  nickname: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Avatar;
