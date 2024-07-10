import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

export const useProductDetail = (productNum) => {
  const [products, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/products/${productNum}`);
        setProduct(response.data);
      } catch (error) {
        console.log(`ERROR MESSAGE: ${error}`);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productNum]);

  return { products, error, loading };
};

export const useSearchProducts = (keyword) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (keyword) {
      setLoading(true);
      apiClient
        .get('/products/search', { params: { keyword } })
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [keyword]);

  return { results, error, loading };
};
