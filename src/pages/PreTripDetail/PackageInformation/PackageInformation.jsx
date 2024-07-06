import styles from './PackageInformation.module.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { formatDateTime } from '../../../utils/DateTime';

const PackageInformation = ({
  productName,
  partnerName,
  price,
  productImage,
  recruitmentDeadline,
  necessaryPeople,
}) => {
  return (
    <section className={styles.packageInformation}>
      <div className={styles.imageContainer}>
        <img
          src={productImage}
          alt={productName}
          className={styles.productImage}
        />
      </div>
      <div className={styles.infoContainer}>
        <h2 className={styles.productName}>{productName}</h2>
        <p className={styles.partnerName}>{partnerName}</p>
        <div className={styles.recruitmentInfo}>
          <PersonIcon className={styles.icon} />
          <p className={styles.recruitment}>
            <span className={styles.highlightText}>{necessaryPeople}</span> 명을
            모집하고 있어요!
          </p>
        </div>
        <p className={styles.price}>{price.toLocaleString()} ₩</p>
        <div className={styles.deadlineInfo}>
          <CalendarMonthIcon className={styles.icon} />
          <span>{formatDateTime(recruitmentDeadline)} 마감</span>
        </div>
        <button className={styles.completedButton}>
          여행이 완료된 상품입니다
        </button>
      </div>
    </section>
  );
};

export default PackageInformation;
