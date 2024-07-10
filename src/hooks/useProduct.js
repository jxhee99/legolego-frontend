import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

export const useProducts = (filters) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let endpoint = '/products';
        if (filters.type) {
          switch (filters.type) {
            case 'recruitmentClose':
              endpoint += '/recruitmentClose';
              break;
            case 'sortByDeadlineDesc':
              endpoint += '/sortByDeadlineDesc';
              break;
            case 'recruitmentConfirmed':
              endpoint += '/recruitmentConfirmed';
              break;
            case 'sortByRegDateDesc':
              endpoint += '/sortByRegDateDesc';
              break;
            case 'sortByPoplar':
              endpoint += '/sortByPoplar';
              break;
            case 'sortByPriceDesc':
              endpoint += '/sortByPriceDesc';
              break;
            case 'sortByPriceAsc':
              endpoint += '/sortByPriceAsc';
              break;
            default:
              break;
          }
        }

        const response = await apiClient.get(endpoint, {
          params: {
            ...filters,
          },
        });

        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    getProducts();
  }, [filters]);

  return { products, error };
};

export const useProductDetail = (productNum) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient
      .get(`/products/${productNum}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [productNum]);

  return { product, error };
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
