import { useState } from 'react';
import styles from '../DiyDetail.module.css';
import axios from 'axios';

const Description = () => {
  const [isCheered, setIsCheered] = useState(false);

  const postCheering = async () => {
    try {
      const response = await axios.post(`/api/packages/likes/1`, {
        userNum: 1,
      });
      console.log(response.data);
      setIsCheered(true);
    } catch (error) {
      console.log(`에러 발생: ${error}`);
    }
  };

  const onClickCheering = () => {
    if (!isCheered) {
      postCheering();
    }
  };

  return (
    <>
      <div className={styles.diy_thumbnail}>
        <img src="https://picsum.photos/seed/picsum/800/400" alt="" />
      </div>
      <h2>베트남으로 떠나는 힐링 여행</h2>
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
