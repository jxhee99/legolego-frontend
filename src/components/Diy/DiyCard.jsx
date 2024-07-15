import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './DiyCard.module.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FaceIcon from '@mui/icons-material/Face';
import Face2Icon from '@mui/icons-material/Face2';
import Face3Icon from '@mui/icons-material/Face3';
import Face4Icon from '@mui/icons-material/Face4';
import Face5Icon from '@mui/icons-material/Face5';
import Face6Icon from '@mui/icons-material/Face6';

const iconComponents = [
  FaceIcon,
  Face2Icon,
  Face3Icon,
  Face4Icon,
  Face5Icon,
  Face6Icon,
];

const DiyCard = ({
  packageNum,
  user,
  profileImg,
  packageName,
  shortDescription,
  packageLikedNum,
  airline,
}) => {
  const navigate = useNavigate();

  const onClickDiyDetail = () => {
    navigate(`/diy/${packageNum}`);
  };

  // 현재 날짜 가져오기
  const currentDate = new Date();

  // boardingDate와 비교하여 이미 지난 날짜인지 확인
  const isPastDate = new Date(airline.boardingDate) < currentDate;
  // 아이콘 랜덤 선택 함수
  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * iconComponents.length);
    const ChosenIcon = iconComponents[randomIndex];
    return <ChosenIcon style={{ fontSize: '0.8rem', color: '#888' }} />;
  };

  return (
    <div
      className={`${styles.DiyCard} ${isPastDate ? styles.pastDate : ''}`}
      onClick={onClickDiyDetail}
    >
      <div className={styles.diy_card_thumbnail}>
        <img src={profileImg} alt={`${packageName} 썸네일`} />
      </div>
      <div className={styles.text_box}>
        <h4>{packageName}</h4>
        <div className={styles.desc}>{shortDescription}</div>
      </div>
      <div className={styles.grayDetail}>
        <div>
          <strong>여행기간 |</strong>
          {new Date(airline.boardingDate).toLocaleDateString()}~
          {new Date(airline.comingDate).toLocaleDateString()}
        </div>
        <div>
          <strong>여행지 |</strong> {airline.destination}
        </div>
        <div className={styles.icon_box}>
          <div className={styles.user_box}>
            <div>
              {' '}
              {getRandomIcon()} {user.userNickname}
            </div>
          </div>
          <div className={styles.likes}>
            <ThumbUpIcon fontSize="0.1rem" className={styles.thumb_icon} />
            <span>{packageLikedNum}</span>
          </div>
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
