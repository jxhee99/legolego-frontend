import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import styles from '../Mypage.module.css'; // Mypage 모듈의 스타일 시트 가져오기

const DiyPackage = () => {
  const [diyLists, setDiyLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiyLists = async () => {
      try {
        const response = await apiClient.get(`/my/packages`); // 엔드포인트를 /my/packages로 수정
        console.log('Fetched data:', response.data);
        
        // 데이터를 역순으로 정렬
        const sortedData = response.data.sort((a, b) => b.packageNum - a.packageNum);

        setDiyLists(sortedData);
        setLoading(false);
      } catch (error) {
        setError('DIY 패키지를 불러오는 중 오류가 발생했습니다.');
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
            <tr key={diy.packageNum}>
              <td>{diy.packageNum}</td>
              <td><Link to={`/diy/${diy.packageNum}`}>
                {diy.packageName}</Link>
              </td>
              <td className={styles.status}>
              <span>
                {diy.isRegistered
                  ? '정식상품 등록완료'
                  : diy.isSelected
                  ? '여행사 제안 완료'
                  : '응원 받는 중 🎈'}
              </span></td>
              <td> <span style={{ fontWeight: 'bold' }}>{diy.packageLikedNum}</span> / 25
              </td>
             <td>{new Date(diy.airline.boardingDate).toLocaleDateString()}</td> 
              <td>{new Date(diy.regDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiyPackage;
