import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Product.module.css';
import ProductCard from '../../components/Card/ProductCard/ProductCard';
import apiClient from '../../api/apiClient';
import ProductSkeleton from '../../components/Card/ProductCard/ProductSkeleton';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ProductList = ({ endpoint }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(9);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get(endpoint);
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [endpoint]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * pageSize;
  const currentProducts = products.slice(startIndex, startIndex + pageSize);

  if (loading) {
    return (
      <ul className={styles.product_cards}>
        {[...Array(4)].map((_, index) => (
          <li key={`skeleton-${index}`}>
            <ProductSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  if (error) {
    return <div>에러가 발생했습니다: {error}</div>;
  }

  if (products.length === 0) {
    return <div>해당하는 패키지가 없습니다.</div>;
  }

  return (
    <>
      <ul className={styles.product_cards}>
        {currentProducts.map((product) => (
          <li key={`product-${product.productNum}`}>
            <ProductCard {...product} />
          </li>
        ))}
      </ul>
      <Stack spacing={2} sx={{ mt: 4 }} alignItems="center">
        <Pagination
          count={Math.ceil(products.length / pageSize)}
          page={page}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
};

ProductList.propTypes = {
  endpoint: PropTypes.string.isRequired,
};

export default ProductList;
