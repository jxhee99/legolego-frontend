import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../Mypage.module.css';
import { Link} from 'react-router-dom';


const SavedPackage = () => {
  const [savedList, setSavedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedList = async () => {
      try {
        const userNum = 1; // 로그인 정보로 변경해야함!!!!!
        const response = await axios.get(`/api/products/${userNum}/wishlist`);
        const wishlistItems = response.data;

        // product정보 가져오기
        const productPromises = wishlistItems.map(async (item) => {
          const productResponse = await axios.get(`/api/products/${item.productNum}`);
          return {
            productNum: productResponse.data.productNum,
            wishlistNum: item.wishlistNum,
            productName: productResponse.data.productName,
            price: productResponse.data.price,
            recruitmentConfirmed: productResponse.data.recruitmentConfirmed,
          };
        });

        const productList = await Promise.all(productPromises);
        setSavedList(productList);
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
              <td>{item.price}</td>
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
