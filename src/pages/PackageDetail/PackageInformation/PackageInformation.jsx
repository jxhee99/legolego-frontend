import styles from '../PackageDetail.module.css';
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
        <p>하나투어</p>
        <p>9박 10일 여행이 99만 9999원!</p>
        <div className={styles.progress_bar}>
          <div className={styles.progress_bar_inner}></div>
        </div>
        <button onClick={() => navigate('/payment')}>레고! 결제하기</button>
      </div>
    </section>
  );
};

export default PackageInformation;
