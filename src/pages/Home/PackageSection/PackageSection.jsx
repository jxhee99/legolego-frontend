import { useState, useEffect } from 'react';
import styles from '../Home.module.css';
import axios from 'axios';
import PackageCard from '../../../components/Card/PackageCard/PackageCard';

const PackageSection = () => {
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

  const limitedPackageData = packageData.slice(0, 4);

  return (
    <section className={styles.PackageSection}>
      <div>
        <h2>레고러들이 선택한 여행에 참여하기</h2>
        <span>더보기</span>
      </div>
      <div className={styles.package_section_cards}>
        {limitedPackageData.map((packageItem) => (
          <PackageCard key={packageItem.productNum} {...packageItem} />
        ))}
      </div>
    </section>
  );
};

export default PackageSection;
