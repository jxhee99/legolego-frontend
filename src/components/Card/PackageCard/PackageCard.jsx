import styles from './PackageCard.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const PackageCard = ({
  packageNum,
  productImage,
  recruitmentDeadline,
  productName,
  price,
  wishlistCount,
  productViewNum,
}) => {
  const navigate = useNavigate();
  const handlePackageCard = () => {
    navigate(`/package-product/${packageNum}`);
  };

  return (
    <div className={styles.PackageCard} onClick={handlePackageCard}>
      <div className={styles.package_card_thumbnail}>
        <img src={productImage} alt="패키지 썸네일" />
      </div>
      <div className={styles.package_card_body}>
        <div>
          <div className={styles.package_card_icon}>
            <span>
              <CalendarMonthIcon />
            </span>
            <span>{recruitmentDeadline}</span>
            <span>₩{price}</span>
          </div>
          <div className={styles.package_card_bottom}>
            <h3>{productName}</h3>
            <div>
              <div className={styles.package_card_icon}>
                <span>
                  <VisibilityIcon />
                </span>
                <span>{productViewNum}</span>
              </div>
              <div className={styles.package_card_icon}>
                <span>
                  <CatchingPokemonIcon />
                </span>
                <span>{wishlistCount}</span>
              </div>
            </div>
          </div>
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
