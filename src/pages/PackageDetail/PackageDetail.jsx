import styles from './PackageDetail.module.css';
import PackageInformation from './PackageInformation/PackageInformation';
import AirplaneInfomation from './AirplaneInformation/AirplaneInformation';
import ScheduleInformation from './ScheduleInformation/ScheduleInformation';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';

const PackageDetail = () => {
  const [packageData, setPackageData] = useState({});
  // const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/products/1`);
      setPackageData(response.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`${styles.PackageDetail} layout`}>
      <PackageInformation {...packageData} />
      <AirplaneInfomation {...packageData.airline} />
      <ScheduleInformation detailCourse={packageData.detailCourse} />
    </div>
  );
};

export default PackageDetail;
