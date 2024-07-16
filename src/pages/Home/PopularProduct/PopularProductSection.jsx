import styles from './PopularProductSection.module.css';
import { useState, useEffect } from 'react';
import ProductCard from '../../../components/Card/ProductCard/ProductCard';
import Metas from '../../../components/common/Metas';
import apiClient from '../../../api/apiClient';

const PopularProductSection = () => {
  const [allProductData, setAllProductData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
        const response = await apiClient.get(`/products/sortByPopular`);
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
      // productItem.productName.toLowerCase().includes(searchTerm.toLowerCase())
      // 추가된 조건: productItem.product.productName이 존재하는지 확인
      productItem.product.productName && productItem.product.productName.toLowerCase().includes(searchTerm.toLowerCase())
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
      <section className={`${styles.product}`}>
   
         <div className={styles.product_cards}>
          {displayedData.map((productItem) => {
            // productItem의 구조 확인
            if (!productItem || !productItem.product.productNum) {
              console.error('Invalid product item:', productItem);
              return null;
            }

            return (
              <ProductCard key={productItem.product.productNum} {...productItem.product} />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default PopularProductSection;
