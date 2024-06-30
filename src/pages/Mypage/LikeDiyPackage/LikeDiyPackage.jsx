import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../Mypage.module.css';
import { Link} from 'react-router-dom';


const LikeDiyPackage = () => {
  const [packages, setPackages] = useState([]); // 패키지 목록을 상태로 관리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedList = async () => {
      try {
        const userNum = 1; // 로그인 정보로 변경 필요
        // 좋아요한 패키지 목록
        const response = await axios.get(`/api/my/likes/${userNum}`);
        const likedPackages = response.data;
        console.log('Fetched data', likedPackages);

        // 패키지 정보 가져오기!
        const detailedPackages = likedPackages.map(item => ({
          packageNum: item.packageNum,
          packageName: item.packageName,
          recruitmentConfirmed: item.recruitmentConfirmed,
        }));

        setPackages(detailedPackages);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch liked packages.');
        setLoading(false);
      }
    };

    fetchLikedList();
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
            <th>진행 상태</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((item) => (
            <tr key={item.packageNum}>
              <td>{item.packageNum}</td>
              <td>
              <Link to={`/diy/${item.packageNum}`}>
                    {item.packageName}
                  </Link></td>
              <td className={styles.status}>
                <span>{item.recruitmentConfirmed ? '승인 완료' : '승인 대기 중'}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LikeDiyPackage;
