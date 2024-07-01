import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OrderList.module.css';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); // 예시: 로컬 스토리지에서 토큰을 가져온다고 가정
        if (!token) {
          throw new Error('Token is not available');
        }

        const response = await axios.get(`/api/user/orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const ordersData = response.data;

        const updatedOrders = await Promise.all(
          ordersData.map(async (order) => {
            const productResponse = await axios.get(`/api/products/${order.productNum}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            return {
              ...order,
              productName: productResponse.data.productName,
              productPrice: productResponse.data.price,
            };
          })
        );

        setOrders(updatedOrders);
        setLoading(false);
      } catch (error) {
        setError('주문 목록을 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const goToOrderDetail = (orderNum) => {
    navigate(`/order-detail/${orderNum}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <table className={styles.OrderList}>
      <thead>
        <tr>
          <th>주문번호</th>
          <th>상품명</th>
          <th>상품가격</th>
          <th>주문수량</th>
          <th>총금액</th>
          <th>결제상태</th>
          <th>리뷰</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.merchantUid}>
            <td>{order.merchantUid}</td>
            <td onClick={() => goToOrderDetail(order.orderNum)}>{order.productName}</td>
            <td>{order.productPrice.toLocaleString()}원</td>
            <td>{order.quantity}</td>
            <td>{order.totalPrice.toLocaleString()}원</td>
            <td>{order.paymentStatus ? '결제완료' : '결제대기'}</td>
            <td>
              {order.review ? (
                '작성완료'
              ) : (
                <button className={styles.status} onClick={() => navigate(`/review/${order.orderNum}`)}>리뷰 작성하기</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;
