import styles from './Product.module.css';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/Card/ProductCard/ProductCard';
import Metas from '../../components/common/Metas';
import apiClient from '../../api/apiClient';
import SearchField from './SerachField/SearchField';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ProductProcessCard from '../../components/Card/ProductProcessCard/ProductProcessCard';

const Product = () => {
  const [allProductData, setAllProductData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const response = await apiClient.get(`/products`);
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className={styles.Product}>
      <Metas title="패키지 상품" />
      <div className={`${styles.productBackground}`}>
        <div className={styles.productText}>
          <p>다른 사람이 만든 패키지 여행을 함께 떠나보세요!</p>
        </div>
      </div>
      <SearchField onChange={handleSearch} value={searchTerm} />
      <section className={`${styles.product}`}>
        <div className={`layout`}>
          <div>
            <h2>어떤 여행을 함께 해볼까요?</h2>
          </div>
          <ProductProcessCard
            image="/path/to/image.jpg"
            title="프랑스에서 아침을"
            category="모두투어"
            price={1250000}
            date="모집 기간: 2024-08-20 00:00:00 까지"
            progress={12}
          />
          <div className={styles.product_cards}>
            {displayedData.map((productItem) => (
              <ProductCard key={productItem.productNum} {...productItem} />
            ))}
          </div>
          <Stack spacing={2} className={styles.pagination}>
            <Pagination
              count={Math.ceil(
                allProductData.filter((productItem) =>
                  productItem.productName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ).length / itemsPerPage
              )}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </div>
      </section>
    </div>
  );
};

export default Product;
