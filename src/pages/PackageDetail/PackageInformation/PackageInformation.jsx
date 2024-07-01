import styles from '../PackageDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { formatDateTime } from '../../../utils/DateTime';

const PackageInformation = ({
  productName,
  partnerName,
  price,
  productImage,
  recruitmentDeadline,
  productViewNum,
  wishlistCount,
  necessaryPeople,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isWished, setIsWished] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchWishStatus = async () => {
      try {
        const response = await axios.get(
          `/api/user/products/${id}/wishlist/status`,
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
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
  }, [id, token]);

  const handleWishNum = async () => {
    try {
      const response = await axios.post(
        `/api/user/products/${id}/wishlist`,
        {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
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
      const response = await axios.delete(`/api/user/products/${id}/wishlist`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        setIsWished(false);
      } else {
        console.error('찜 취소 실패:', response.status);
      }
    } catch (error) {
      console.error('찜 취소 오류 발생:', error);
    }
  };

  return (
    <section className={styles.PackageInformation}>
      <div className={styles.left_box}>
        <img src={productImage} alt="상품 이미지" />
      </div>
      <div className={styles.right_box}>
        <h2>{productName}</h2>
        <p>{partnerName}</p>
        <div>{necessaryPeople} 명을 모집하고 있어요~!</div>
        <p>{price} ₩</p>
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
            <button onClick={handleWishNum}>상품 찜하기</button>
          ) : (
            <button onClick={handleCancelWish}>찜 취소하기</button>
          )}
          <button onClick={() => navigate(`/order/${id}`)}>
            레고! 결제하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackageInformation;
