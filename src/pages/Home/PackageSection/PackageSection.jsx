import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Home.module.css';
import SpecialCard from './SpecialCard';
import apiClient from '../../../api/apiClient';

const PackageSection = () => {
  const [packageData, setPackageData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');

        // 필요한 제품 번호들을 병렬로 API 호출
        const productNums = [3, 5, 6, 7, 8];
        const requests = productNums.map(num => apiClient.get(`/products/${num}`));
        const responses = await Promise.all(requests);

        // API 응답에서 받아온 데이터 확인
        const filteredData = responses.map(response => response.data);
        console.log('Filtered data:', filteredData);

        // 필터링된 데이터를 state에 저장
        setPackageData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.PackageSection}>
      <div className={styles.container}>
        <ul id="cards">
          {packageData.map((packageItem, index) => (
            <li className={styles.card} key={index} id={`card${index + 1}`}>
              <div className={styles['card-body']}>
                <SpecialCard
                  key={packageItem.productNum}
                  productData={packageItem}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PackageSection;