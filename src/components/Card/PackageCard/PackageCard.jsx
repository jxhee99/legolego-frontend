import styles from './PackageCard.module.css';
import PropTypes from 'prop-types';

// TODO 컴포넌트 수정 예정
// const mock = {
//   productNum: 1,
//   productName: '상품명',
//   productImage: '이미지url',
//   price: '가격',
//   recruitmentDeadline: '모집마감여부',
//   recruitmentConfirmed: '모집 확정 여부',
//   productViewNum: '조회수',
//   productLovedNum: '좋아요수',
// };

const PackageCard = ({ imageUrl, title, partnerName }) => {
  return (
    <div className={styles.PackageCard}>
      <div className={styles.package_card_thumbnail}>
        <img src={imageUrl} alt="패키지 썸네일" />
      </div>
      <div className={styles.package_card_body}>
        <span>{partnerName}</span>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

PackageCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  partnerName: PropTypes.string.isRequired,
};

export default PackageCard;
