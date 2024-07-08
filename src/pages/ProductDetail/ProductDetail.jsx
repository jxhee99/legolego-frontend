import styles from './ProductDetail.module.css';
import PackageInformation from './ProductInformation/ProductInformation';
import AirplaneInfomation from './AirplaneInformation/AirplaneInformation';
import ScheduleInformation from './ScheduleInformation/ScheduleInformation';
import RecommendProduct from './RecommendProduct/RecommendProduct';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Metas from '../../components/common/Metas';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import ProductMenu from './ProductMenu/ProductMenu';

const PackageDetail = () => {
  const [packageData, setPackageData] = useState({});
  const [destination, setDestination] = useState();
  const [activeSection, setActiveSection] = useState('airplane-info');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setPackageData(response.data);
        setDestination(response.data.airline.destination);
      } catch (error) {
        console.error('Error', error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const airplaneInfo = document.getElementById('airplane-info');
      const scheduleInfo = document.getElementById('schedule-info');

      if (airplaneInfo && scheduleInfo) {
        const airplaneInfoTop = airplaneInfo.getBoundingClientRect().top;
        const scheduleInfoTop = scheduleInfo.getBoundingClientRect().top;

        if (airplaneInfoTop < window.innerHeight / 2 && airplaneInfoTop >= 0) {
          setActiveSection('airplane-info');
        } else if (
          scheduleInfoTop < window.innerHeight / 2 &&
          scheduleInfoTop >= 0
        ) {
          setActiveSection('schedule-info');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Metas title={packageData.productName} />
      <ScrollToTop />
      <div className={`${styles.PackageDetail} layout`}>
        <PackageInformation
          {...packageData}
          detailCourse={packageData.detailCourse}
        />
        <ProductMenu activeSection={activeSection} />
        <section id="airplane-info" className={`${styles.section}`}>
          <AirplaneInfomation {...packageData.airline} />
        </section>
        <section id="schedule-info" className={`${styles.section}`}>
          <ScheduleInformation detailCourse={packageData.detailCourse} />
        </section>
        <section id="recomment-info" className={`${styles.section}`}>
          <RecommendProduct />
        </section>
      </div>
    </>
  );
};

export default PackageDetail;
