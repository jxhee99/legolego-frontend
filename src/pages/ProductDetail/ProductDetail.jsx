import styles from './ProductDetail.module.css';
import ProductInformation from './ProductInformation/ProductInformation';
import AirplaneInformation from './AirplaneInformation/AirplaneInformation';
import ScheduleInformation from './ScheduleInformation/ScheduleInformation';
import RecommendProduct from './RecommendProduct/RecommendProduct';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Metas from '../../components/common/Metas';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import ProductMenu from './ProductMenu/ProductMenu';
import { useProductDetail } from '../../hooks/useProduct';

const PackageDetail = () => {
  const [activeSection, setActiveSection] = useState('airplane-info');
  const { productNum } = useParams();
  const { products, error } = useProductDetail(productNum);
  console.log(products);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Metas title={products.productName} />
      <ScrollToTop />
      <div className={`${styles.PackageDetail} layout`}>
        <ProductInformation {...products} />
        <ProductMenu activeSection={activeSection} />
        <section id="airplane-info" className={`${styles.section}`}>
          <AirplaneInformation {...products.airline} />
        </section>
        <section id="schedule-info" className={`${styles.section}`}>
          <ScheduleInformation detailCourse={products.detailCourse} />
        </section>
        <RecommendProduct destination={products.airline.destination} />
      </div>
    </>
  );
};

export default PackageDetail;
