import styles from './Product.module.css';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/Card/ProductCard/ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSearchProducts } from '../../hooks/useProduct';
import apiClient from '../../api/apiClient';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const { results, error } = useSearchProducts(keyword);
  const [products, setProducts] = useState([]);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  const displayedProducts = keyword ? results : products;

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
        {displayedProducts.length > 0 ? (
          <ul className={styles.product_cards}>
            {displayedProducts.map((product) => (
              <li key={product.productNum}>
                <ProductCard {...product} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.noResults}>검색 결과가 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default Search;
