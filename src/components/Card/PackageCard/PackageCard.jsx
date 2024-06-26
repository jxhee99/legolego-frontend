import styles from './PackageCard.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../../utils/DateTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const PackageCard = ({
  productNum,
  productImage,
  recruitmentDeadline,
  productName,
  price,
  wishlistCount,
  productViewNum,
}) => {
  const navigate = useNavigate();
  const handlePackageCard = () => {
    navigate(`/package-product/${productNum}`);
  };

  return (
    <div className={styles.PackageCard} onClick={handlePackageCard}>
      <div className={styles.package_card_thumbnail}>
        <img src={productImage} alt="패키지 썸네일" />
      </div>
      <div className={styles.package_card_body}>
        <h3>{productName}</h3>
        <span>₩ {price}</span>
      </div>
      <div className={styles.package_card_bottom}>
        <div className={styles.package_card_icon}>
          <CalendarMonthIcon />
          <span>
            ~{' '}
            {formatDateTime(recruitmentDeadline).replace(/\s\d{2}:\d{2}$/, '')}
          </span>
        </div>
        <div className={styles.package_card_icon}>
          <VisibilityIcon />
          <span>{productViewNum}</span>
        </div>
        <div className={styles.package_card_icon}>
          <CatchingPokemonIcon />
          <span>{wishlistCount}</span>
        </div>
      </div>
    </div>
  );
};

PackageCard.propTypes = {
  productImage: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  partnerName: PropTypes.string.isRequired,
};

export default PackageCard;
