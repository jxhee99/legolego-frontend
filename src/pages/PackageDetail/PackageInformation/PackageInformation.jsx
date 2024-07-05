import styles from './PackageInformation.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { formatDateTime } from '../../../utils/DateTime';
import apiClient from '../../../api/apiClient';
import noneWhite from '../../../assets/images/none-white.png';

const PackageInformation = ({
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
          console.error('찜 상태 불러오기 실패:', response.status);
        }
      } catch (error) {
        console.error('찜 상태 불러오는 중 오류 발생:', error);
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
        console.error('찜하기 실패:', response.status);
      }
    } catch (error) {
      console.error('찜 업데이트 오류 발생:', error);
    }
  };

  const handleCancelWish = async () => {
    try {
      const response = await apiClient.delete(`/user/products/${id}/wishlist`);

      if (response.status === 204) {
        setIsWished(false);
      } else {
        console.error('찜 취소 실패:', response.status);
      }
    } catch (error) {
      console.error('찜 취소 오류 발생:', error);
    }
  };

  const progressPercentage = Math.min(
    (orderCount / necessaryPeople) * 100,
    100
  );

  return (
    <section className={styles.PackageInformation}>
      <div className={styles.left_box}>
        <img src={productImage || noneWhite} alt="상품 이미지" />
      </div>
      <div className={styles.right_box}>
        <h2>{productName}</h2>
        <p className={styles.partner}>{partnerName}</p>
        <p>{price} 원</p>
        <div className={styles.progress}>
          <div
            className={styles.progressBar}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className={styles.progressText}>
          <span>{necessaryPeople}명 모집</span>{' '}
          <span>
            {orderCount} / {necessaryPeople} 명 참여
          </span>
        </div>
        <div className={styles.icon_information}>
          <div>
            <span>
              <CalendarMonthIcon />
            </span>
            <span>{formatDateTime(recruitmentDeadline)} 마감</span>
          </div>
          <div>
            <div>
              <span>
                <VisibilityIcon />
              </span>
              <span>{productViewNum}</span>
            </div>
            <div>
              <span>
                <CatchingPokemonIcon />
              </span>
              <span>{wishlistCount}</span>
            </div>
          </div>
        </div>

        <div>
          {!isWished ? (
            <button onClick={handleWishNum} className={styles.wish_button}>
              상품 찜하기
            </button>
          ) : (
            <button onClick={handleCancelWish} className={styles.wish_button}>
              찜 취소하기
            </button>
          )}
          <button
            onClick={() => navigate(`/order/${id}`)}
            className={styles.payment_button}
          >
            레고! 결제하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackageInformation;
