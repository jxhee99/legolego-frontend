import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Home.module.css';
import axios from 'axios';
import PackageCard from '../../../components/Card/PackageCard/PackageCard';

const PackageSection = () => {
  const [packageData, setPackageData] = useState([]);
  const navigate = useNavigate();

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

  const limitedPackageData = packageData.slice(0, 6);

  return (
    <section className={styles.PackageSection}>
      <div className={styles.package_title}>
        <h2>레고러들이 선택한 여행에 참여하기</h2>
        <button
          className={styles.more_button}
          onClick={() => navigate('/package-product')}
        >
          더보러가기
        </button>
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
