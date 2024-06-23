import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './DiyCard.module.css';

const DiyCard = ({
  packageNum,
  page,
  user,
  profileImg,
  packageName,
  children,
}) => {
  const navigate = useNavigate();

  const onClickDiyDetail = () => {
    navigate(`/diy/${packageNum}`);
  };

  return (
    <div className={styles.DiyCard} onClick={onClickDiyDetail}>
      {page && <p>{user.userName}님의 여행 둘러보세요!</p>}
      <div className={styles.diy_card_thumbnail}>
        <img src={profileImg} alt={`${packageName} 썸네일`} />
      </div>
      <h4>{packageName}</h4>
      {children}
    </div>
  );
};

DiyCard.propTypes = {
  packageNum: PropTypes.number.isRequired,
  page: PropTypes.bool,
  user: PropTypes.shape({
    userName: PropTypes.string.isRequired,
  }).isRequired,
  profileImg: PropTypes.string,
  packageName: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default DiyCard;
