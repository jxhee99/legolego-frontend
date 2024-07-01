import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../Mypage.module.css';
import { Link } from 'react-router-dom';

const SavedPackage = () => {
  const [savedList, setSavedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedList = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token is not available');
        }

        // 찜 목록 가져오기
        const response = await axios.get(`/api/user/products/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const wishlistItems = response.data;

        // 각 상품에 대한 추가 정보 요청
        const updatedOrders = await Promise.all(
          wishlistItems.map(async (item) => {
            const productResponse = await axios.get(`/api/products/${item.productNum}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            return {
              ...item,
              productName: productResponse.data.productName,
              productPrice: productResponse.data.price,
            };
          })
        );

        setSavedList(updatedOrders); // 상태 업데이트
        setLoading(false);
      } catch (error) {
        setError('Failed to load Saved List');
        setLoading(false);
      }
    };

    fetchSavedList();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>찜 번호</th>
            <th>제목</th>
            <th>금액</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {savedList.map((item) => (
            <tr key={item.wishlistNum}>
              <td>{item.wishlistNum}</td>
              <td><Link to={`/package-product/${item.productNum}`}>
                {item.productName}
              </Link></td>
              <td>{item.productPrice}</td>
              <td className={styles.status}>
                {item.recruitmentConfirmed ? '출발 확정' : '모집 중'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedPackage;
