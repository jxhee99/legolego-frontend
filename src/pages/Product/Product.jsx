import styles from './Product.module.css';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/Card/ProductCard/ProductCard';
import Metas from '../../components/common/Metas';
import apiClient from '../../api/apiClient';

const Product = () => {
  const [allPackageData, setAllPackageData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  console.log(displayedData);

  const fetchData = async () => {
    try {
      const response = await apiClient.get(`/products`);
      setAllPackageData(response.data);
      setDisplayedData(response.data.slice(0, 10));
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = allPackageData.filter((packageItem) =>
      packageItem.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedData(filteredData.slice(0, itemsToShow));
  }, [itemsToShow, allPackageData, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.PacakgeAll}>
      <Metas title="패키지 상품" />
      <div className={`${styles.packageBackground}`}>
        <div className={styles.packageText}>
          <p>다른 사람이 만든 패키지 여행을 함께 떠나보세요!</p>
        </div>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="패키지 상품을 검색하세요.     "
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <section className={`${styles.Package}`}>
        <div className={`layout`}>
          <div>
            <h2>어떤 여행을 함께 해볼까요?</h2>
          </div>
          <div className={styles.package_cards}>
            {displayedData.map((packageItem) => (
              <ProductCard key={packageItem.productNum} {...packageItem} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
