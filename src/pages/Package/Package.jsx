import styles from './Package.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PackageCard from '../../components/Card/PackageCard/PackageCard';
import Metas from '..//../components/common/Metas';

const Package = () => {
  const [packageData, setPackageData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/products`);
      console.log(response.data);
      setPackageData(response.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Metas title="패키지 상품" />
      <section className={`${styles.Package} layout`}>
        <h2>어떤 여행을 함께 해볼까요?</h2>
        <div className={styles.package_cards}>
          {packageData.map((packageItem) => (
            <PackageCard key={packageItem.productNum} {...packageItem} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Package;
