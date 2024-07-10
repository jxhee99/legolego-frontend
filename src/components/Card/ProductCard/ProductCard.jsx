import React from 'react';
import styles from './ProductCard.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../../utils/DateTime';

const confirmBadge = () => {
  return (
    <div>
      <BookmarkIcon className={styles.bookmarkIcon} />
      <span>모집확정</span>
    </div>
  );
};

const ProductCard = ({
  productNum,
  productImage,
  productName,
  recruitmentDeadline,
  price,
  wishlistCount,
}) => {
  const navigate = useNavigate();

  const handlePackageCardClick = () => {
    navigate(`/product/${productNum}`);
  };

  return (
    <div className={styles.ProductCard} onClick={handlePackageCardClick}>
      <img src={productImage} alt={productName} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.content_title}>
          <h3 className={styles.title}>{productName}</h3>
          <div className={styles.likes}>
            <span>{wishlistCount}</span>
            <FavoriteBorderIcon className={styles.heartIcon} />
          </div>
        </div>
        <div className={styles.content_body}>
          <span>여행기간</span>
          <p className={styles.date}>
            {formatDateTime(recruitmentDeadline).replace(/\s\d{2}:\d{2}$/, '')}
          </p>
        </div>
        <p className={styles.price}>{price.toLocaleString()} 원</p>
      </div>
    </div>
  );
};

export default ProductCard;
