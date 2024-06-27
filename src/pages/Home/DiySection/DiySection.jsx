import styles from '../Home.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DiyCard from '../../../components/Diy/DiyCard';

const API_URL = '/api/packages';

const DiySection = () => {
  const [diyData, setDiyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const limitedDiyData = diyData.slice(0, 6);

  return (
    <section className={styles.DiySection}>
      <div className={styles.diy_title}>
        <h2>방금 올라온 DIY 패키지</h2>
        <button className={styles.more_button} onClick={() => navigate('/diy')}>
          더보러가기
        </button>
      </div>
      <div className={styles.diy_section_cards}>
        {limitedDiyData.map((packages) => (
          <div key={packages.packageNum}>
            <DiyCard {...packages} page={true}></DiyCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiySection;
