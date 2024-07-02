import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OrderList.module.css';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get(`/user/orders`);
        const ordersData = response.data;

        const updatedOrders = await Promise.all(
          ordersData.map(async (order) => {
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

        setOrders(updatedOrders);
        setLoading(false);
      } catch (error) {
        setError('주문 목록을 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // 빈 배열을 useEffect 의존성 배열로 사용하여 한 번만 실행되도록 설정

  const goToOrderDetail = (orderNum) => {
    navigate(`/order-detail/${orderNum}`);
  };

  const handleRefund = async (orderNum, productName, totalPrice) => {
    const confirmRefund = window.confirm(
      `환불하시겠습니까?  \n\n  상품명: ${productName}  \n  환불 금액은 ${totalPrice} 원입니다.`
    );
    if (!confirmRefund) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('토큰이 없습니다.');
      }

      await axios.delete(`/api/user/orders/${orderNum}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 환불 후 주문 목록 갱신
      const response = await axios.get(`/api/user/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedOrders = await Promise.all(
        response.data.map(async (order) => {
          const productResponse = await axios.get(
            `/api/products/${order.productNum}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return {
            ...order,
            productName: productResponse.data.productName,
            productPrice: productResponse.data.price,
          };
        })
      );

      setOrders(updatedOrders);

      alert('환불이 완료되었습니다.');
    } catch (error) {
      console.error('환불 처리 중 오류가 발생했습니다.', error);
      alert('환불에 실패하였습니다.'); // 환불 실패시 경고창 추가
    }
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
          <th>환불</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.merchantUid}>
            <td>{order.merchantUid}</td>
            <td onClick={() => goToOrderDetail(order.orderNum)}>
              {order.productName}
            </td>
            <td>{order.productPrice.toLocaleString()}원</td>
            <td>{order.quantity}</td>
            <td>{order.totalPrice.toLocaleString()}원</td>
            <td>{order.paymentStatus ? '결제완료' : '결제대기'}</td>
            <td>
              {order.review ? (
                '작성완료'
              ) : (
                <button
                  className={styles.status}
                  onClick={() => navigate(`/review/${order.orderNum}`)}
                >
                  리뷰 작성하기
                </button>
              )}
            </td>
            <td>
              {order.refundStatus ? (
                ' 환불완료'
              ) : (
                <button
                  className={styles.refund_button}
                  onClick={() =>
                    handleRefund(
                      order.orderNum,
                      order.productName,
                      order.totalPrice
                    )
                  }
                >
                  환불하기
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;
