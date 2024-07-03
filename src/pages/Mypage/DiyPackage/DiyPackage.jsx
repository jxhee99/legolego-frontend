import styles from '../Mypage.module.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../../api/apiClient';

const DiyPackage = () => {
  const [diyLists, setDiyLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiyLists = async () => {
      try {

        // 사용자의 패키지 목록을 가져옴
        const response = await apiClient.get(`/user/diylists`);
        console.log('Fetched data:', response.data); 
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
            <th>받은 좋아요</th>
            <th>여행출발일자</th>
            <th>작성일자</th>
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
              <span>
                {diy.isRegistered
                  ? '정식상품 등록완료'
                  : diy.isSelected
                  ? '여행사 제안 완료'
                  : '응원 받는 중'}
              </span></td>
              <td> <span style={{ fontWeight: 'bold' }}>{diy.diyPackage.packageLikedNum}</span> / 25
              </td>
             <td>{new Date(diy.diyPackage.airline.boardingDate).toLocaleDateString()}</td> 
              <td>{new Date(diy.regDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiyPackage;
