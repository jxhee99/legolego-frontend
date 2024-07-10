import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Product.module.css';
import ProductCard from '../../components/Card/ProductCard/ProductCard';
import apiClient from '../../api/apiClient';
import ProductSkeleton from '../../components/Card/ProductCard/ProductSkeleton';
import PaginationComp from '../../components/Pagination/PaginationComp';

const ProductList = ({ endpoint }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
        {products.map((product) => (
          <li key={`product-${product.productNum}`}>
            <ProductCard {...product} />
          </li>
        ))}
      </ul>
      {/* <PaginationComp
        page={currentPage}
        setPage={setCurrentPage}
        totalItems={totalProducts}
        itemsPerPage={ITEMS_PER_PAGE}
        filterApplied={currentFilter}
      /> */}
    </>
  );
};

ProductList.propTypes = {
  endpoint: PropTypes.string.isRequired,
};

export default ProductList;
