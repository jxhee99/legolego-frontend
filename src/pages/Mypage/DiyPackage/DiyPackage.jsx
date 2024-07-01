import styles from '../Mypage.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DiyPackage = () => {
  const [diyLists, setDiyLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiyLists = async () => {
      try {
        const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 가져옴
        if (!token) {
          throw new Error('Token is not available');
        }

        // 사용자의 패키지 목록을 가져옴
        const response = await axios.get(`/api/user/diylists`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDiyLists(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load DIY packages');
        setLoading(false);
      }
    };

    fetchDiyLists();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>상품번호</th>
            <th>제목</th>
            <th>상태</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {diyLists.map((diy) => (
            <tr key={diy.listNum}>
              <td>{diy.productNum}</td>
              <td><Link to={`/diy/${diy.diyPackage.packageNum}`}>
                {diy.diyPackage.packageName}</Link>
              </td>
              <td className={styles.status}>
                <span>{diy.isSelected ? '응원 받는 중' : '여행사 제안 완료'}</span>
              </td>
              <td>{new Date(diy.regDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiyPackage;
