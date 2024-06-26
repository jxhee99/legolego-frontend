import styles from './Diy.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DiyCard from '../../components/Diy/DiyCard';
import Avatar from '../../components/Avatar/Avatar';

const API_URL = '/api/packages';

const Diy = () => {
  const [diyData, setDiyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={`${styles.Diy} layout`}>
      <h2>DIY 패키지를 응원해주세요!</h2>
      <div className={styles.diy_cards}>
        {diyData.map((packages) => (
          <div key={packages.packageNum}>
            <h4 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              {packages.user.userName}님의 여행 둘러보세요!
            </h4>
            <DiyCard {...packages} page={true}></DiyCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Diy;
