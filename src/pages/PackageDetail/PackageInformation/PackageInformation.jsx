import styles from '../PackageDetail.module.css';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PackageInformation = ({
  productName,
  partnerName,
  price,
  productImage,
  recruitmentDeadline,
  productViewNum,
  wishlistCount,
}) => {
  const [wishNum, setWishNum] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishNum = async () => {
      try {
        const response = await axios.get(`/products/{user_num}/wishlist`, {
          user_num: 1,
        });
        const data = await response.json();
        setWishNum(data.wishNum);
      } catch (error) {
        console.error('Error fetching wishNum:', error);
      }
    };

    fetchWishNum();
  }, []);

  return (
    <section className={styles.PackageInformation}>
      <div className={styles.left_box}>
        <img src={productImage} alt="상품이미지" />
      </div>
      <div className={styles.right_box}>
        <h2>{productName}</h2>
        <p>{partnerName}</p>
        <p>{price}</p>
        <div className={styles.icon_information}>
          <div>
            <span>
              <CalendarMonthIcon />
            </span>
            <span>{recruitmentDeadline}까지 결제</span>
          </div>
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
        <div>
          <button disabled={wishNum === 1}>상품 찜하기</button>
          <button onClick={() => navigate('/payment')}>레고! 결제하기</button>
        </div>
      </div>
    </section>
  );
};

export default PackageInformation;
