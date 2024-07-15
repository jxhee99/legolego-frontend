import { useNavigate } from 'react-router-dom';
import Metas from '../../components/common/Metas';
import CardSlide from '../PreTrip/CommentSection/CardSlide';
import DiySection from './DiySection/DiySection';
import IntroSection from './IntroSection/IntroSection';
import PackageSection from './PackageSection/PackageSection';
import ProductCardSection from './ProductCardSection/ProductCardSection';
import styles from './Home.module.css';
import PopularProductSection from './PopularProduct/PopularProductSection';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Metas title="내가 만드는 패키지 여행" />
      <div className={styles.homeBackground}>
      <IntroSection />
      <div className={`${styles.Home} layout`}>
        <div className={styles.textButton_main}>
          <div className={styles.textButton_text}>
            <h2 className={styles.title}>🚀 레고레고만의 특색있는 상품을 만나보세요!</h2>
          </div>
          <div className={styles.textButton_button}>
            <button
              className={styles.more_button}
              onClick={() => navigate('/product')}
            >
              더보러가기
            </button>
          </div>
        </div>

        <PackageSection /> {/* 특색있는 상품  */}
        <section id="package-section">
        <div className={styles.textButton}>
          <div className={styles.textButton_text}>
            <h2 className={styles.title}>🚀 인기 상품 둘러보기</h2>
          </div>
          <div className={styles.textButton_button}>
            <button
              className={styles.more_button}
              onClick={() => navigate('/product')}
            >
              더보러가기
            </button>
          </div>
          </div>
       <PopularProductSection/> {/* 인기 상품 */}
       </section>
        <div className={styles.textButton}>
          <div className={styles.textButton_text}>
            <h2 className={styles.title}>🚀 마감 임박 상품</h2>
          </div>
          <div className={styles.textButton_button}>
            <button
              className={styles.more_button}
              onClick={() => navigate('/product')}
            >
              더보러가기
            </button>
          </div>
        </div>
        <ProductCardSection />
        <section id="diy-section">
        <div className={styles.textButton}>
          <div className={styles.textButton_text}>
            <h2 className={styles.title}>🚀 방금 올라온 DIY 여행</h2>
          </div>
          <div className={styles.textButton_button}>
            <button
              className={styles.more_button}
              onClick={() => navigate('/diy')}
            >
              더보러가기
            </button>
          </div>
</div>
        <DiySection />
</section>
<section id="review-section">
        <div className={styles.textButton}>

          <div className={styles.textButton_text}>
            <h2 className={styles.title}>🚀 레고러들의 여행후기</h2>
          </div>
          <div className={styles.textButton_button}>
            <button
              className={styles.more_button}
              onClick={() => navigate('/pre-trip')}
            >
              더보러가기
            </button>
          </div>
          </div>
        <CardSlide />
        </section>
      </div>
      </div>
    </>
  );
};

export default Home;
