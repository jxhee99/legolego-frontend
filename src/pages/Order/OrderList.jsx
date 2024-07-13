import React, { useState, useEffect } from 'react';
import styles from './OrderList.module.css';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import OrderReview from './OrderReview/OrderReview';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get(`/user/orders`);
        const ordersData = response.data;
        console.log('Fetched orders data:', ordersData);

        const updatedOrders = await Promise.all(
          ordersData.map(async (order) => {
            try {
              const productResponse = await apiClient.get(`/products/${order.productNum}`);
              console.log('Fetched product data for order:', order.orderNum, productResponse.data);

              const updatedOrder = {
                ...order,
                productName: productResponse.data.productName,
                productPrice: productResponse.data.price,
                productDate: productResponse.data.recruitmentDeadline,
                productBoardingDate: productResponse.data.airline.boardingDate,
                reviewAble: productResponse.data.reviewAble,
              };

              console.log('추가한 데이터:', updatedOrder.productBoardingDate);
              return updatedOrder;
            } catch (error) {
              console.error('제품 데이터를 불러오는 중 오류가 발생했습니다.', error);
              throw error;
            }
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

  const handleRefund = async (orderNum, productName, totalPrice, productDate) => {
    const confirmRefund = window.confirm(
      `환불하시겠습니까?  \n\n  상품명: ${productName}  \n  환불 금액은 ${totalPrice} 원입니다.`
    );
    if (!confirmRefund) {
      return;
    }

    try {
      await apiClient.delete(`/user/orders/${orderNum}`);

      const response = await apiClient.get(`/user/orders`);
      const updatedOrders = await Promise.all(
        response.data.map(async (order) => {
          const productResponse = await apiClient.get(`/products/${order.productNum}`);
          return {
            ...order,
            productName: productResponse.data.productName,
            productPrice: productResponse.data.price,
            productDate: productResponse.data.recruitmentDeadline,
            productBoardingDate: productResponse.data.airline.boardingDate,
            reviewAble: productResponse.data.reviewAble,
          };
        })
      );

      setOrders(updatedOrders);

      alert('환불이 완료되었습니다.');
    } catch (error) {
      console.error('환불 처리 중 오류가 발생했습니다.', error);

      const currentTimestamp = new Date();
      const recruitmentDeadline = new Date(productDate);
      console.log(recruitmentDeadline, currentTimestamp);

      if (recruitmentDeadline < currentTimestamp) {
        alert('주문 취소 기간이 지났습니다.');
      } else {
        alert('환불에 실패하였습니다.');
      }
    }
  };

  const maskMerchantUid = (merchantUid) => {
    const visibleChars = 8; // 보여질 문자열 길이
    const maskedPart = merchantUid.substring(0, visibleChars);
    const maskedUid = maskedPart + '...';
    return maskedUid;
  };

  const handleOpen = (order) => {
    setCurrentOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentOrder(null);
  };

  const renderReviewButton = (order) => {
    if (!order.paymentStatus || order.refundStatus || (!order.refundStatus && !order.reviewAble)) {
      // 결제 상태가 false이거나, 환불 상태가 true이거나, 환불 상태가 false이고 리뷰 작성이 불가능한 경우 버튼 없애기
      return null;
    }

    if (!order.refundStatus && order.reviewAble) {
      // 환불 상태가 false이고 리뷰 작성이 가능한 경우
      if (order.reviewNum !== undefined && order.reviewNum > 0) {
        // reviewNum이 존재하고 0보다 큰 경우 (작성완료)
        return (
          <button
            className={styles.status}
            onClick={() => handleOpen(order)}
          >
            작성완료
          </button>
        );
      } else {
        // reviewNum이 존재하지 않거나 0인 경우 (작성하기)
        return (
          <button
            className={styles.status}
            onClick={() => handleOpen(order)}
          >
            작성하기
          </button>
        );
      }
    }

    return null;
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
            <td>{maskMerchantUid(order.merchantUid)}</td>
            <td onClick={() => goToOrderDetail(order.orderNum)}>
              {order.productName}
            </td>
            <td>{order.productPrice.toLocaleString()}원</td>
            <td>{order.quantity}</td>
            <td>{order.totalPrice.toLocaleString()}원</td>
            <td>
              {order.refundStatus
                ? '환불완료'
                : order.paymentStatus
                  ? '결제완료'
                  : '결제실패'}
            </td>
            <td>
              {renderReviewButton(order)}

              {open && currentOrder?.orderNum === order.orderNum && (
                <OrderReview
                  open={open}
                  handleClose={handleClose}
                  orderNum={order.orderNum}
                  reviewNum={order.reviewNum}
                />
              )}
            </td>
            <td>
              {order.paymentStatus ? (
                order.refundStatus ? (
                  '환불완료'
                ) : (
                  <button
                    className={styles.refund_button}
                    onClick={() =>
                      handleRefund(
                        order.orderNum,
                        order.productName,
                        order.totalPrice,
                        order.productDate
                      )
                    }
                  >
                    환불요청
                  </button>
                )
              ) : (
                ' '
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;