import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './DiyCard.module.css';

const DiyCard = ({
  packageNum,
  page,
  user,
  profileImg,
  packageName,
  shortDescription,
  children,
}) => {
  const navigate = useNavigate();

  const onClickDiyDetail = () => {
    navigate(`/diy/${packageNum}`);
  };

  return (
    <div className={styles.DiyCard} onClick={onClickDiyDetail}>
      <div className={styles.diy_card_thumbnail}>
        <img src={profileImg} alt={`${packageName} 썸네일`} />
      </div>
      <div className={styles.text_box}>
        <h4>{packageName}</h4>
        <div className={styles.desc}>{shortDescription}</div>
      </div>
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
  shortDescription: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default DiyCard;
