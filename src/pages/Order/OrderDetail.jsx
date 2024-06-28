import React, { useState, useEffect } from 'react';
import styles from './OrderDetail.module.css';
import axios from 'axios';
import PackageCard from '../../components/Card/PackageCard/PackageCard';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const OrderDetail = () => {
  const navigate = useNavigate();
  const goToOrderList = () => {
    navigate('/mypage?tab=order-summary');
  };

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { orderNum } = useParams(); // URL에서 orderNum 파라미터 가져오기

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        // 주문 상세 정보를 가져오는 API 호출 (orderNum 기반)
        const response = await axios.get(`/api/orders/${orderNum}`);
        const orderData = response.data;
        console.log('Fetched data', orderData);

        // 필수 필드가 있는지 검사
        if (!orderData.orderNum || !orderData.price || !orderData.quantity || !orderData.totalPrice) {
          throw new Error('주문 상세 정보가 올바르지 않습니다.');
        }

        setOrder(orderData); // 주문 정보 설정
        setLoading(false); // 로딩 상태 변경
      } catch (error) {
        setError('주문 상세 정보를 불러오는 중 오류가 발생했습니다.');
        setLoading(false); // 오류 발생 시 로딩 상태 변경
      }
    };

    fetchOrderDetail(); // useEffect 내에서 함수 호출
  }, [orderNum]); // orderNum 값이 변경될 때마다 useEffect 재실행

  if (loading) return <div>Loading...</div>; // 로딩 중일 때 표시될 화면
  if (error) return <div>{error}</div>; // 오류 발생 시 표시될 화면
  if (!order) return null; // 주문 정보가 없을 경우

  // 주문 정보를 출력하는 부분
  return (
    <div className={styles.OrderDetail}>
      <h2>결제내역</h2>
      <div className={`${styles.ProductInformation} ${styles.box_style}`}>
        <div className={styles.orderDetail_packageCard}>
          <PackageCard />
        </div>
      </div>

      <div className={`${styles.Orderer} ${styles.box_style}`}>
        <h3>결제 정보</h3>
        <div className={styles.OrderDetailList}>
          <div className={styles.OrderDetailItem}>
            <span className={styles.OrderDetailLabel}>주문번호</span>
            <span className={styles.OrderDetailValue}>{order.orderNum}</span>
          </div>
          <div className={styles.OrderDetailItem}>
            <span className={styles.OrderDetailLabel}>상품가격</span>
            <span className={styles.OrderDetailValue}>{order.price.toLocaleString()}원</span>
          </div>
          <div className={styles.OrderDetailItem}>
            <span className={styles.OrderDetailLabel}>주문수량</span>
            <span className={styles.OrderDetailValue}>{order.quantity}</span>
          </div>
          <div className={`${styles.OrderDetailItem} ${styles.totalPriceItem}`}>
            <span className={styles.OrderDetailLabel}>총금액</span>
            <span className={styles.OrderDetailValue}>{order.totalPrice.toLocaleString()}원</span>
          </div>
        </div>
        </div>
        <div className={`${styles.Orderer} ${styles.box_style}`}>
        <h3>여행자 정보</h3>
        <div className={styles.OrderDetailList}>
          <div className={styles.OrderDetailItem}>
            <span className={styles.OrderDetailLabel}>이름</span>
            <span className={styles.OrderDetailValue}>{order.userName}</span>
          </div>
          <div className={styles.OrderDetailItem}>
            <span className={styles.OrderDetailLabel}>메일주소</span>
            <span className={styles.OrderDetailValue}>{order.userEmail}</span>
          </div>
          <div className={styles.OrderDetailItem}>
            <span className={styles.OrderDetailLabel}>전화번호</span>
            <span className={styles.OrderDetailValue}>{order.userPhone}</span>
          </div>
        </div>
      </div>


      <div className={styles.orderDetail_buttons}>
      <button className={styles.orderDetail_back}onClick={goToOrderList}>뒤로가기</button>
        <button className={styles.orderDetail_refund}>결제취소</button>
      </div>
  </div>
  );
};

export default OrderDetail;
