import styles from '../Product.module.css';
import { useEffect, useState } from 'react';
import ProductCard from '../../../components/Card/ProductCard/ProductCard';
import apiClient from '../../../api/apiClient';

const RecruitmentConfirmed = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await apiClient.get('/products/recruitmentConfirmed');

        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    getProducts();
  }, []);

  return (
    <ul className={styles.product_cards}>
      {products.map((product) => (
        <li key={`product-${product.productNum}`}>
          <ProductCard {...product} />
        </li>
      ))}
    </ul>
  );
};

export default RecruitmentConfirmed;
