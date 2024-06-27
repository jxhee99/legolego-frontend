import styles from './Diy.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DiyCard from '../../components/Diy/DiyCard';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const API_URL = '/api/packages';

const Diy = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const [diyData, setDiyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const initialPage = parseInt(query.get('page')) || 1;
  const [page, setPage] = useState(initialPage);
  const itemsPerPage = 12;

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setDiyData(response.data);
    } catch (error) {
      setError('데이터를 가져오는 중 문제가 발생했습니다.');
      console.error('Error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 페이지 및 필터 변경 시 처리
  useEffect(() => {
    const newQuery = new URLSearchParams(location.search);
    newQuery.set('page', page);
    navigate({ search: newQuery.toString() });
  }, [page, navigate]);

  // 현재 페이지에 맞는 데이터 계산
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = diyData.slice(startIndex, endIndex);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <section className={`${styles.Diy} layout`}>
        <h2>DIY 패키지를 응원해주세요!</h2>
        <div className={styles.diy_cards}>
          {currentItems.map((packages) => (
            <div key={packages.packageNum}>
              <h4 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                {packages.user.userName}님의 여행 둘러보세요!
              </h4>
              <DiyCard {...packages} page={true}></DiyCard>
            </div>
          ))}
        </div>
      </section>
      <div className={styles.pagination_box}>
        <Stack spacing={2} className={styles.pagination}>
          <Pagination
            count={Math.ceil(diyData.length / itemsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Stack>
      </div>
    </>
  );
};

export default Diy;
