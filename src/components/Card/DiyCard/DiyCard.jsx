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
      {/* {page && <p>{user.userName}님의 여행 둘러보세요!</p>} */}
      <div className={styles.diy_card_thumbnail}>
        <img
          src={`https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXVMMpirgBgSChtMDIYiH09gZzsgibGVM5EBgx9CAxnbfhCFKhn3WVMV4rHxVSaSBI7RR5n4xx4NZ3-cueTB6LvTu1fvdtvPcBv4dEht861RiyzM0Is92dfZv1XQ0EEsbP3YjNnAU9l6wnK98Dh1gVnzJVZNybwJyI5dnmv5TfBZOE4M&3u400&4u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173&key=AIzaSyAblAMlRJOooJk9NNyvDtHhL8fpd9vtgck&token=22013"
`}
          alt={`${packageName} 썸네일`}
        />
      </div>
      <h4>{packageName}</h4>
      <p>{shortDescription}</p>
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
