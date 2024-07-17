import { useState, useEffect } from 'react';
import styles from './ProductCard.module.css';
import PropTypes from 'prop-types';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../../utils/DateTime';
import apiClient from '../../../api/apiClient';

const ProductCard02 = ({ productData }) => {
  if (!productData) {
    return <div>Product data is not available</div>;
  }

  const product = productData.product || productData;
  const {
    productNum = 'unknown',
    productImage,
    productName,
    price,
    wishlistCount: initialWishlistCount,
    boardingDate,
    comingDate,
  } = product;
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(initialWishlistCount || 0);

  useEffect(() => {
    if (!productNum) {
      console.error('Product Number is undefined');
      return;
    }

    const fetchWishStatus = async () => {
      try {
        const response = await apiClient.get(
          `/user/products/${productNum}/wishlist/status`
        );
        if (response.status === 200) {
          setIsFavorite(response.data);
        } else {
          console.error('Failed to load wishlist status:', response.status);
        }
      } catch (error) {
        console.error('Error loading wishlist status:', error);
      }
    };

    fetchWishStatus();
  }, [productNum]);

  const handlePackageCardClick = () => {
    navigate(`/product/${productNum}`);
  };

  const handleWishNum = async (e) => {
    e.stopPropagation();
    try {
      const response = await apiClient.post(
        `/user/products/${productNum}/wishlist`,
        {}
      );
      if (response.status === 201) {
        setIsFavorite(true);
        setWishlistCount(wishlistCount + 1);
      } else {
        console.error('Failed to add to wishlist:', response.status);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleCancelWish = async (e) => {
    e.stopPropagation();
    try {
      const response = await apiClient.delete(
        `/user/products/${productNum}/wishlist`
      );
      if (response.status === 204) {
        setIsFavorite(false);
        setWishlistCount(wishlistCount - 1);
      } else {
        console.error('Failed to cancel wishlist:', response.status);
      }
    } catch (error) {
      console.error('Error canceling wishlist:', error);
    }
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
          <div className={styles.likes}>
            <span>{wishlistCount}</span>
            {!isFavorite ? (
              <button
                className={`${styles.heartIcon} ${styles.favorited}`}
                onClick={handleWishNum}
              >
                <FavoriteBorderIcon />
              </button>
            ) : (
              <button className={styles.heartIcon} onClick={handleCancelWish}>
                <FavoriteIcon />
              </button>
            )}
          </div>
        </div>
        <div className={styles.content_body}>
          <span>여행기간</span>
          <p className={styles.date}>
            {formatDateTime(boardingDate).replace(/\s\d{2}:\d{2}$/, '')}~
            {formatDateTime(comingDate).replace(/\s\d{2}:\d{2}$/, '')}
          </p>
        </div>
        <p className={styles.price}>{price ? price.toLocaleString() : ''} 원</p>
      </div>
    </div>
  );
};

ProductCard02.propTypes = {
  productNum: PropTypes.number.isRequired,
  productImage: PropTypes.string,
  productName: PropTypes.string,
  price: PropTypes.number,
  wishlistCount: PropTypes.number,
  boardingDate: PropTypes.string,
  comingDate: PropTypes.string,
};

export default ProductCard02;
