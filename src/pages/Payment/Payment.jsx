import styles from './Payment.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = `/info/for-payment`;

const Payment = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
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

  return (
    <div className={styles.Payment}>
      <h2>주문/결제</h2>
      <div className={`${styles.ProductInformation} ${styles.box_style}`}>
        <h3>주문정보 확인</h3>
        <div>
          <img src={data.imageUrl || 'default.jpg'} alt="Product Image" />
        </div>
        <div>
          <ul>
            <li>
              <span>여행 출발일: {data.startDate}</span>
            </li>
            <li>
              <span>여행 종료일: {data.endDate}</span>
            </li>
            <li>
              <span>인원: {data.people}</span>
            </li>
            <li>
              <span>가격: {data.price}원</span>
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

      <div className={`${styles.Pay}`}>
        <h3>결제하기</h3>
        <p>총 가격: {data.totalPrice}원</p>
        <button>결제</button>
      </div>
    </div>
  );
};

export default Payment;
