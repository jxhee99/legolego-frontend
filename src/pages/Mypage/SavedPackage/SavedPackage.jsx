import React, { useState, useEffect } from 'react';
import styles from '../Mypage.module.css';
import { Link } from 'react-router-dom';
import apiClient from '../../../api/apiClient';

const SavedPackage = () => {
  const [savedList, setSavedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedList = async () => {
      try {
        // 찜 목록 가져오기
        const response = await apiClient.get(`/user/products/wishlist`);
        const wishlistItems = response.data;
        console.log('Fetched wishlist items:', wishlistItems); // 데이터 확인용 로그

        // 각 상품에 대한 추가 정보 요청
        const updatedOrders = await Promise.all(
          wishlistItems.map(async (item) => {
            const productResponse = await apiClient.get(`/products/${item.productNum}`);
            console.log('추가정보요청:', productResponse); // 데이터 확인용 로그

            return {
              ...item,
              productName: productResponse.data.productName,
              productPrice: productResponse.data.price,
              boardingDate: productResponse.data.airline.boardingDate,
              recruitmentDeadline: productResponse.data.recruitmentDeadline,
              recruitmentConfirmed: productResponse.data.recruitmentConfirmed

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
            <th>모집기한</th>
            <th>여행출발날짜</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {savedList.map((item) => (
            <tr key={item.wishlistNum}>
              <td>{item.wishlistNum}</td>
              <td><Link to={`/product/${item.productNum}`}>
                {item.productName}
              </Link></td>
              <td>{item.productPrice}</td>
              <td>{new Date(item.recruitmentDeadline).toLocaleDateString()
               }</td>
              <td>{new Date(item.boardingDate).toLocaleDateString()
               }</td>
               
              <td className={styles.status}>
                {item.recruitmentConfirmed ? <span>출발 확정</span> :<span>모집 중</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedPackage;
