import styles from './Product.module.css';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/Card/ProductCard/ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSearchProducts } from '../../hooks/useProduct';
import apiClient from '../../api/apiClient';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const { results, error } = useSearchProducts(searchKeyword);
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

  const handleSearch = () => {
    setSearchKeyword(keyword);
  };

  const handleReset = () => {
    setKeyword('');
    setSearchKeyword('');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className={styles.productList}>
        <div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search for products"
          />
          <button onClick={handleSearch}>검색</button>
          <button onClick={handleReset}>초기화</button>
        </div>

        {searchKeyword ? (
          results.length > 0 ? (
            <ul className={styles.product_cards}>
              {results.map((product) => (
                <li key={product.productNum}>
                  <ProductCard {...product} />
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.noResults}>검색 결과가 없습니다.</div>
          )
        ) : (
          <ul className={styles.product_cards}>
            {products.map((product) => (
              <li key={product.productNum}>
                <ProductCard {...product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Search;
