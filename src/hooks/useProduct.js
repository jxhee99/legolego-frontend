import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

export const useProductDetail = (productNum) => {
  const [products, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${productNum}`);
        setProduct(response.data);
      } catch (error) {
        console.log(`ERROR MESSAGE: ${error}`);
        setError(error);
      }
    };

    getProduct();
  }, [productNum]);

  return { products, error };
};

export const useSearchProducts = (keyword) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (keyword) {
      apiClient
        .get('/products/search', { params: { keyword } })
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [keyword]);

  return { results, error };
};
