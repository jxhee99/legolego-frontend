import styles from '../DiyDetail.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Description = () => {
  const [diyData, setDiyData] = useState({});
  const [isCheered, setIsCheered] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/packages/${id}`);
      setDiyData(response.data);
    } catch (error) {
      console.log(`에러 발생: ${error}`);
    }
  };

  const postData = async () => {
    try {
      const response = await axios.post(`/api/packages/likes/${id}`, {
        userNum: id,
      });
      console.log(response.data);
      setIsCheered(true);
    } catch (error) {
      console.log(`에러 발생: ${error}`);
    }
  };

  const onClickCheering = () => {
    fetchData();

    if (!isCheered) {
      postData();
    }
  };

  return (
    <>
      <h2>베트남으로 떠나는 힐링 여행</h2>
      <div className={styles.diy_thumbnail}>
        <img src="https://picsum.photos/seed/picsum/800/400" alt="" />
      </div>
      <p>응원하기 눌러주세요~~~~~</p>
      <div className={styles.cheering}>
        <button
          onClick={onClickCheering}
          className={isCheered ? styles.cheeredButton : styles.cheerButton}
          disabled={isCheered}
        >
          {isCheered ? '응원 완료' : '응원하기'}
        </button>
        <div>12</div>
      </div>
    </>
  );
};

export default Description;
