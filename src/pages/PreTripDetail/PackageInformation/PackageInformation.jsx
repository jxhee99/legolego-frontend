import styles from '../PreTripDetail.module.css';
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
        <button>여행이 완료된 상품입니다</button>
      </div>
    </section>
  );
};

export default PackageInformation;
