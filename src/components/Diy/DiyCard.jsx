  import { useNavigate } from 'react-router-dom';
  import PropTypes from 'prop-types';
  import styles from './DiyCard.module.css';
  import AccountCircleIcon from '@mui/icons-material/AccountCircle';
  import ThumbUpIcon from '@mui/icons-material/ThumbUp';

  const DiyCard = ({
    packageNum,
    user,
    profileImg,
    packageName,
    shortDescription,
    packageLikedNum,
    airline
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
        <div className={styles.grayDetail}>
          <div>여행기간 | {new Date(airline.boardingDate).toLocaleDateString()}~{new Date(airline.comingDate).toLocaleDateString()}</div>
        

          <div className={styles.likes}>
          <ThumbUpIcon fontSize='0.1rem' className={styles.thumb_icon} />
          <span>{packageLikedNum}</span>
        </div>
          <div className={styles.user_box}>
          <AccountCircleIcon fontSize='1rem' />
          <div>{user.userNickname}</div>
        </div>
        </div>
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
    // children: PropTypes.element.isRequired,
  };

  export default DiyCard;
