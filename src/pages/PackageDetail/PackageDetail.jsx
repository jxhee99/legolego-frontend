import styles from './PackageDetail.module.css';
import PackageInformation from './PackageInformation/PackageInformation';
import AirplaneInfomation from './AirplaneInformation/AirplaneInformation';
import ScheduleInformation from './ScheduleInformation/ScheduleInformation';
import RecommendProduct from './RecommendProduct/RecommendProduct';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Metas from '../../components/common/Metas';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

const PackageDetail = () => {
  const [packageData, setPackageData] = useState({});
  const [destination, setDestination] = useState();
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

  return (
    <>
      <Metas title={packageData.productName} />
      <ScrollToTop />
      <div className={`${styles.PackageDetail} layout`}>
        <PackageInformation {...packageData} />
        <AirplaneInfomation {...packageData.airline} />
        <ScheduleInformation detailCourse={packageData.detailCourse} />
        <RecommendProduct destination={destination} />
      </div>
    </>
  );
};

export default PackageDetail;
