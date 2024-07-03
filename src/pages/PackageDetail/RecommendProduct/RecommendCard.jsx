import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../../utils/DateTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import noneLego from '../../../assets/images/none.jpg';
import styles from './RecommendProduct.module.css';

const RecommendCard = ({
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
        <img src={productImage || noneLego} alt="패키지 썸네일" />
      </div>
      <h5>{productName}</h5>
      <span>{price} ₩</span>
      <div className={styles.package_card_bottom}>
        <CalendarMonthIcon fontSize="small" />
        <span>
          ~ {formatDateTime(recruitmentDeadline).replace(/\s\d{2}:\d{2}$/, '')}
        </span>
      </div>
    </div>
  );
};

export default RecommendCard;
