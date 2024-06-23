import styles from './Package.module.css';
import { useState, useEffect } from 'react';
import PackageCard from '../../components/Card/PackageCard/PackageCard';
import axios from 'axios';

const Package = () => {
  const [packageData, setPackageData] = useState([]);

  const fetchPackage = async () => {
    try {
      const response = await axios.get(`/api/products`);
      console.log(response.data);
      setPackageData(response.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, []);

  return (
    <section className={`${styles.Package} layout`}>
      <h2>어떤 여행을 함께 해볼까요?</h2>
      <div className={styles.package_cards}>
        {/* {packageData.map((item) => (
          <PackageCard
            key={item.packageNum}
            imageUrl={item.imageUrl}
            title={item.shortDescription}
            partnerName="하나투어"
          />
        ))} */}
      </div>
    </section>
  );
};

export default Package;
