import styles from '../PackageDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../../../_slices/authSlice';
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
  const [wishNum, setWishNum] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    const fetchWishNum = async () => {
      try {
        const response = await axios.get(
          `/api/products/${id}/wishlist?user_num=1`
        );
        setWishNum(response.data.wishNum);
      } catch (error) {
        console.error('찜 불러오는 중 오류 발생:', error);
      }
    };

    fetchWishNum();
  }, []);

  const handleWishNum = async () => {
    const isWish = confirm('상품을 찜하시겠습니까?');
    if (isWish) {
      try {
        const response = await axios.post(
          `/api/products/${id}/wishlist?user_num=1`
        );
        setWishNum(response.data.wishNum);
      } catch (error) {
        console.error('찜 업데이트 오류 발생:', error);
      }
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
        <p>{price}</p>
        <div>{necessaryPeople}</div>
        <div className={styles.icon_information}>
          <div>
            <span>
              <CalendarMonthIcon />
            </span>
            <span>
              {formatDateTime(recruitmentDeadline).replace(
                /\s\d{2}:\d{2}$/,
                ''
              )}{' '}
              마감
            </span>
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
          <button disabled={wishNum === 1} onClick={handleWishNum}>
            상품 찜하기
          </button>
          <button onClick={() => navigate('/payment')}>레고! 결제하기</button>
        </div>
      </div>
    </section>
  );
};

export default PackageInformation;
