import styles from '../Mypage.module.css';

const DiyPackage = () => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>상품번호</th>
            <th>제목</th>
            <th>상태</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>베트남으로 떠나요!</td>
            <td className={styles.status}>
              <span>응원 받는 중</span> <span>8/20</span>
            </td>
            <td>2024.06.24</td>
          </tr>
          <tr>
            <td>2</td>
            <td>스위스 자연여행</td>
            <td className={styles.status}>
              <span>여행사 제안 완료</span>
            </td>
            <td>2024.06.24</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DiyPackage;
