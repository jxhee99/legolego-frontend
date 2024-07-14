import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import styles from './RecommendProduct.module.css';
import RecommendCard from './RecommendCard';

const RecommendProduct = ({ destination }) => {
  const [data, setData] = useState();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          `/packages/recommend/products?destination=${destination}&package_num=${id}`
        );
        if (response.status === 200) {
          setData(response.data);
        } else {
          console.log('추천 상품 없음', response.status);
        }
      } catch (error) {
        console.error('추천 상품 불러오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [destination, id]);
  return (
    destination &&
    data && (
      <div className={styles.recommend_box}>
        <h4>추천 상품</h4>
        <RecommendCard {...data} />
      </div>
    )
  );
};

export default RecommendProduct;
