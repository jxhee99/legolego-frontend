import Metas from '../../components/common/Metas';
import CardSlide from '../PreTrip/CommentSection/CardSlide';
import DiySection from './DiySection/DiySection';
import IntroSection from './IntroSection/IntroSection';
import PackageSection from './PackageSection/PackageSection';
import ProductCardSection from './ProductCardSection/ProductCardSection';
import styles from './Home.module.css'

const Home = () => {
  return (
    <>
      <Metas title="내가 만드는 패키지 여행" />
      <IntroSection />
      <div className={`${styles.Home} layout`}>
      <div>
          <h2>🚀 레고레고만의 특색있는 상품을 만나보세요!</h2>
        </div>     
    
    
        <PackageSection />   {/* 특색있는 상품  */}
      <section id="package-section">
         <div>
          <h2>🚀 인기 상품 둘러보기</h2>  
        </div>
        <PackageSection /> {/*인기 상품  */}
      </section>
         <div>
          <h2>🚀 모집 마감 임박 상품</h2>
        </div>
        <ProductCardSection />
      <section id="diy-section">
      <div>
          <h2>🚀 방금 올라온 DIY 여행</h2>
        </div>
      <DiySection />
      </section>
      <section id="review-section">
        <div>
          <h2>🚀 레고러들의 여행후기</h2>
        </div>
        <CardSlide />
      </section>
    </div>
    </>
  );
};

export default Home;
