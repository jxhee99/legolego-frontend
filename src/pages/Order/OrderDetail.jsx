import styles from './OrderDetail.module.css';


const OrderDetail = () => {

  return (
    <div className={styles.OrderDetail}>
      <h2>결제내역</h2>
      <div className={`${styles.ProductInformation} ${styles.box_style}`}>
        <h3>결제내역 확인</h3>
        <div>
          <img src={"https://media.istockphoto.com/id/1473421123/ko/%EC%82%AC%EC%A7%84/%EC%8B%B1%EA%B0%80%ED%8F%AC%EB%A5%B4%EC%9D%98-%ED%95%98%EC%A7%80-%EB%A0%88%EC%9D%B8%EC%97%90%EC%84%9C-%EB%B0%B0%EB%82%AD%EC%9D%84-%EB%A9%94%EA%B3%A0-%EC%9E%88%EB%8A%94-%EC%A0%8A%EC%9D%80-%EC%97%AC%EC%84%B1-%EA%B4%80%EA%B4%91%EA%B0%9D.webp?b=1&s=170667a&w=0&k=20&c=rDpvDXVvRx2KMocZZ2qGWKAWQYVp4RT5o3Whq8uRQ7s="} alt="Product Image" />
        </div>
        <div>
          <ul>
            <li>
              <span>여행 출발일: 2024-08-15</span>
            </li>
            <li>
              <span>여행 종료일: 2024-08-17</span>
            </li>
            <li>
              <span>인원: 1 명</span>
            </li>
            <li>
              <span>가격: 999,000원</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={`${styles.Orderer} ${styles.box_style}`}>
        <h3>주문자정보</h3>
        <table>
          <tbody>
            <tr>
              <td>이름</td>
              <td>김민지</td>
            </tr>
            <tr>
              <td>이메일</td>
              <td>wngml2666@naver.com</td>
            </tr>
            <tr>
              <td>연락처</td>
              <td>010-1111-1111</td>
            </tr>
          </tbody>
        </table>
      </div>
</div>
  );
};

export default OrderDetail;
