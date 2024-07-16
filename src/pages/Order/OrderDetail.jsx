import React, { useState, useEffect } from 'react';
import styles from './OrderDetail.module.css';
import PackageCard from '../../components/Card/PackageCard/PackageCard';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';

const OrderDetail = () => {
  const navigate = useNavigate();
  const goToOrderList = () => {
    navigate('/mypage?tab=order-summary');
  };

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderNum } = useParams(); // URL에서 orderNum 파라미터 가져오기
  const [packageData, setPackageData] = useState([]);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await apiClient.get(`/user/orders/${orderNum}`);
        const orderData = response.data;
        console.log('Fetched data', orderData);

        if (
          !orderData.orderNum ||
          !orderData.price ||
          !orderData.quantity ||
          !orderData.totalPrice
        ) {
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

  useEffect(() => {
    const fetchPackageCard = async () => {
      try {
        const productResponse = await apiClient.get(
          `/products/${order.productNum}`
        );
        const packageCardData = productResponse.data;
        console.log('Fetched package card data', packageCardData);

        // packageCardData를 배열로 변환하여 setPackageData에 설정
        setPackageData([packageCardData]);
      } catch (error) {
        console.error('Error fetching package card data', error);
      }
    };

    if (order) {
      fetchPackageCard(); // order 상태가 변경될 때마다 패키지 카드 데이터 다시 불러오기
    }
  }, [order]); // order 값이 변경될 때마다 useEffect 재실행

  const handleRefund = async () => {
    const confirmRefund = window.confirm(
      `환불하시겠습니까?  \n\n  상품명: ${order.productName}  \n  환불 금액은 ${order.totalPrice} 원입니다.`
    );
    if (!confirmRefund) {
      return;
    }

    try {
      await apiClient.delete(`/user/orders/${order.orderNum}`);

      // 환불 후 주문 목록 갱신
      const response = await apiClient.get(`/user/orders`);
      const updatedOrders = await Promise.all(
        response.data.map(async (order) => {
          const productResponse = await apiClient.get(
            `/products/${order.productNum}`
          );
          return {
            ...order,
            productName: productResponse.data.productName,
            productPrice: productResponse.data.price,
          };
        })
      );

      setOrder(updatedOrders); // OrderList 컴포넌트에서 사용하는 state 업데이트

      alert('환불이 완료되었습니다.');
    } catch (error) {
      console.error('환불 처리 중 오류가 발생했습니다.', error);

      const currentTimestamp = new Date();
      const recruitmentDeadline = new Date(packageData[0]?.recruitmentDeadline);
      console.log(recruitmentDeadline, currentTimestamp);

      if (recruitmentDeadline < currentTimestamp) {
        alert('주문 취소 기간이 지났습니다.');
      } else {
        alert('환불에 실패하였습니다.');
      }
    }
  };

  if (loading) return <div>Loading...</div>; // 로딩 중일 때 표시될 화면
  if (error) return <div>{error}</div>; // 오류 발생 시 표시될 화면
  if (!order) return null; // 주문 정보가 없을 경우
  console.log(packageData);
  // 주문 정보를 출력하는 부분
  return (
    <div className={styles.OrderDetail}>
      <h2>결제내역</h2>
      <div className={`${styles.PackageInformation}`}>
        <div className={styles.orderDetail_packageCard}>
          {packageData.map((packageItem) => (
            <PackageCard key={packageItem.productNum} {...packageItem} />
          ))}
        </div>
      </div>

      <div className={`${styles.Orderer} ${styles.box_style}`}>
        <h3>결제 정보</h3>
        <div className={styles.OrderDetailList}>
          <div className={styles.OrderDetailItem}>
            <span className={styles.OrderDetailLabel}>주문번호</span>
            <span className={styles.OrderDetailValue}>{order.merchantUid}</span>
          </div>
          <div className={styles.OrderDetailItem}>
            <span className={styles.OrderDetailLabel}>결제상태</span>
            <span className={styles.OrderDetailValue}>
              {order.refundStatus
                ? '환불완료'
                : order.paymentStatus
                  ? '결제완료'
                  : '결제실패'}
            </span>
          </div>
          <div className={styles.OrderDetailItem}>
            <span className={styles.OrderDetailLabel}>상품가격</span>
            <span className={styles.OrderDetailValue}>
              {order.price.toLocaleString()}원
            </span>
          </div>
          <div className={styles.OrderDetailItem}>
            <span className={styles.OrderDetailLabel}>주문수량</span>
            <span className={styles.OrderDetailValue}>{order.quantity}</span>
          </div>
          <div className={`${styles.OrderDetailItem} ${styles.totalPriceItem}`}>
            <span className={styles.OrderDetailLabel}>총금액</span>
            <span className={styles.OrderDetailValue}>
              {order.totalPrice.toLocaleString()}원
            </span>
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
        <button className={styles.orderDetail_back} onClick={goToOrderList}>
          뒤로가기
        </button>
        <div>
          {order.paymentStatus ? (
            order.refundStatus ? (
              ' '
            ) : (
              <button
                className={styles.orderDetail_refund}
                onClick={handleRefund}
              >
                환불요청
              </button>
            )
          ) : (
            ' '
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
