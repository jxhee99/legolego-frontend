import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Home.module.css';
import ProductProcessCard from '../../../components/Card/ProductProcessCard/ProductProcessCard';
import apiClient from '../../../api/apiClient';

const PackageSection = () => {
  const [packageData, setPackageData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const response = await apiClient.get(`/products/sortByPopular`);
        setPackageData(response.data);
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
                <ProductProcessCard
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
