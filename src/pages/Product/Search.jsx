import { useState, useEffect } from 'react';
import ProductCard from '../../components/Card/ProductCard/ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSearchProducts } from '../../hooks/useProduct';
import apiClient from '../../api/apiClient';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import styles from './Product.module.css';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const { results, error } = useSearchProducts(keyword);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const displayedProducts = keyword ? results : products;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = displayedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <div className={styles.productList}>
        <div className={styles.searchContainer}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="text"
            value={keyword}
            onChange={handleInputChange}
            placeholder="패키지 상품을 검색하세요"
            className={styles.searchInput}
          />
        </div>
        {currentProducts.length > 0 ? (
          <ul className={styles.product_cards}>
            {currentProducts.map((product) => (
              <li key={product.productNum}>
                <ProductCard {...product} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.noProducts}>검색 결과가 없습니다.</div>
        )}
        <Stack spacing={2} sx={{ mt: 4 }} alignItems="center">
          <Pagination
            count={Math.ceil(displayedProducts.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            className={styles.pagination}
          />
        </Stack>
      </div>
    </>
  );
};

export default Search;
