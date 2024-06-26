import styles from '../PreTripDetail.module.css';
import { useNavigate } from 'react-router-dom';

const PackageInformation = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.PackageInformation}>
      <div className={styles.left_box}>
        <img src="https://picsum.photos/400 " alt="상품이미지" />
      </div>
      <div className={styles.right_box}>
        <h2>Lorem, ipsum dolor sit amet consectetur adipisicing.</h2>
        <h3>하나투어</h3>
        <h4>9박 10일</h4>
        <p id={styles.pretrip_price}> ₩ 990,000</p>

        <button>여행이 완료된 상품입니다.</button>
      </div>
    </section>
  );
};

export default PackageInformation;
