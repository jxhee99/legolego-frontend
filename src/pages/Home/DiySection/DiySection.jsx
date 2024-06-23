import styles from '../Home.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DiyCard from '../../../components/Card/DiyCard/DiyCard';
import Avatar from '../../../components/Avatar/Avatar';

const API_URL = '/api/packages';

const DiySection = () => {
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
    <section className={styles.DiySection}>
      <h2>방금 올라온 DIY 패키지</h2>
      <div className={styles.diy_section_cards}>
        {diyData.map((packages) => (
          <DiyCard key={packages.packageNum} {...packages} page={true}>
            <Avatar
              nickname={packages.user.userName}
              imageUrl={packages.profileImg}
            />
          </DiyCard>
        ))}
      </div>
    </section>
  );
};

export default DiySection;
