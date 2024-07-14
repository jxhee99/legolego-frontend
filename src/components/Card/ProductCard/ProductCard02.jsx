import React, { useState } from 'react';
import styles from './ProductCard.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../../utils/DateTime';

const ProductCard02 = ({ productData }) => {
  if (!productData) {
    return <div>Product data is not available</div>;
  }

  const product = productData.product || productData;
  const {
    productNum = 'unknown',
    productImage,
    productName,
    recruitmentDeadline,
    price,
    wishlistCount,
  } = product;

  console.log(product);

  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePackageCardClick = () => {
    navigate(`/product/${productNum}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className={`${styles.ProductCard} ${isHovered ? styles.hovered : ''}`}
      onClick={handlePackageCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={productImage} alt={productName} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.content_title}>
          <h3 className={styles.title}>{productName}</h3>
          <div className={styles.likes} onClick={handleFavoriteClick}>
            <span>{wishlistCount}</span>
            {isFavorite ? (
              <FavoriteIcon
                className={`${styles.heartIcon} ${styles.favorited}`}
              />
            ) : (
              <FavoriteBorderIcon className={styles.heartIcon} />
            )}
          </div>
        </div>
        <div className={styles.content_body}>
          <span>여행기간</span>
          <p className={styles.date}>
            {formatDateTime(recruitmentDeadline).replace(/\s\d{2}:\d{2}$/, '')}
          </p>
        </div>
        <p className={styles.price}>{price} 원</p>
      </div>
    </div>
  );
};

export default ProductCard02;
