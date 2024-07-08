import styles from './ProductSummary.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { formatDateTime } from '../../../utils/DateTime';
import apiClient from '../../../api/apiClient';

const ProductSummary = ({
  productName,
  partnerName,
  price,
  productImage,
  recruitmentDeadline,
  productViewNum,
  wishlistCount,
  orderCount,
  necessaryPeople,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    const fetchWishStatus = async () => {
      try {
        const response = await apiClient.get(
          `/user/products/${id}/wishlist/status`
        );
        if (response.status === 200) {
          setIsWished(response.data);
        } else {
          console.error('Failed to load wishlist status:', response.status);
        }
      } catch (error) {
        console.error('Error loading wishlist status:', error);
      }
    };

    fetchWishStatus();
  }, [id]);

  const handleWishNum = async () => {
    try {
      const response = await apiClient.post(
        `/user/products/${id}/wishlist`,
        {}
      );
      if (response.status === 201) {
        setIsWished(true);
      } else {
        console.error('Failed to add to wishlist:', response.status);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleCancelWish = async () => {
    try {
      const response = await apiClient.delete(`/user/products/${id}/wishlist`);
      if (response.status === 204) {
        setIsWished(false);
      } else {
        console.error('Failed to cancel wishlist:', response.status);
      }
    } catch (error) {
      console.error('Error canceling wishlist:', error);
    }
  };

  const progressPercentage = Math.min(
    (orderCount / necessaryPeople) * 100,
    100
  );

  return (
    <div className={styles.ProductSummary}>
      <div className={styles.imageContainer}>
        <img src={productImage} alt={productName} className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.tag}>{partnerName}</div>
        <h2 className={styles.title}>{productName}</h2>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>참여 인원</span>
            <span className={`${styles.statValue} ${styles.fundingAmount}`}>
              {orderCount}명
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>달성률</span>
            <span className={`${styles.statValue} ${styles.fundingPercentage}`}>
              {progressPercentage}%
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>가격</span>
            <span className={`${styles.statValue} ${styles.price}`}>
              {price} 원
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>마감일</span>
            <span className={`${styles.statValue} ${styles.deadline}`}>
              {formatDateTime(recruitmentDeadline)}
            </span>
          </div>
        </div>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className={styles.actions}>
          <div className={styles.actionGroup}>
            {!isWished ? (
              <button className={styles.likeButton} onClick={handleWishNum}>
                <FavoriteBorderIcon />
                {wishlistCount}
              </button>
            ) : (
              <button className={styles.likeButton} onClick={handleCancelWish}>
                <FavoriteIcon />
                {wishlistCount}
              </button>
            )}
            <span className={styles.shareButton}>
              <RemoveRedEyeIcon /> {productViewNum}
            </span>
          </div>
          {orderCount === necessaryPeople ? (
            <button className={styles.paymentButton} disabled>
              모집이 완료된 상품입니다.
            </button>
          ) : (
            <button
              className={styles.paymentButton}
              onClick={() => navigate(`/order/${id}`)}
            >
              레고! 결제하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSummary;
