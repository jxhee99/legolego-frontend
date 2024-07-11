import styles from './ProductCardSection.module.css';
import { useState, useEffect } from 'react';
import ProductCard from '../../../components/Card/ProductCard/ProductCard';
import Metas from '../../../components/common/Metas';
import apiClient from '../../../api/apiClient';

const ProductCardSection = () => {
  const [allProductData, setAllProductData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const response = await apiClient.get('/products/recruitmentClose');
      setAllProductData(response.data);
      setDisplayedData(response.data.slice(0, itemsPerPage));
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = allProductData.filter((productItem) =>
      productItem.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedData(filteredData.slice(startIndex, endIndex));
  }, [itemsPerPage, currentPage, allProductData, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Metas title="패키지 상품" />
      <section className={`${styles.product} layout`}>
        {/* <h2>Imminent</h2> */}
        <div className={styles.product_cards}>
          {displayedData.map((productItem) => (
            <ProductCard key={productItem.productNum} {...productItem} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductCardSection;
