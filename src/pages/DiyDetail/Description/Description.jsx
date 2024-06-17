import styles from '../DiyDetail.module.css';

const Description = () => {
  return (
    <>
      <div className={styles.diy_thumbnail}>
        <img src="https://picsum.photos/seed/picsum/800/400" alt="" />
      </div>
      <h2>베트남으로 떠나는 힐링 여행</h2>
      <p>응원하기 눌러주세요~~~~~</p>
      <div className={styles.cheering}>
        <button>응원하기</button>
        <div>
          <span>1</span>
          <span>2</span>
        </div>
      </div>
    </>
  );
};

export default Description;
