import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import styles from './Payment.module.css';
import axios from 'axios';

const PaymentPage = () => {
    const { state } = useLocation();
    const { product, count, totalPrice, user } = state;
    const navigate = useNavigate();

    useEffect(() => {
      const handlePayment = async () => {
          try {
              // 주문 정보 생성 요청
              const orderResponse = await axios.post('/api/orders', {
                  userNum: 1, // 실제 사용자 정보를 여기에 설정
                  userName: '김김김',
                  userEmail: 'wngml2666@naver.com',
                  userPhone: '010-2222-2222',
                  productNum: product.productNum,
                  price: product.price,
                  quantity: count,
                  totalPrice: totalPrice
              });

              const merchantUid = orderResponse.data.orderNumber;
              console.log("주문 생성 성공 - Merchant UID: " + merchantUid);

              // Portone 결제 요청
              const { IMP } = window;
              if (IMP) {
                  IMP.init('imp01063088');
                  IMP.request_pay({
                      pg: 'html5_inicis',
                      pay_method: 'card',
                      merchant_uid: merchantUid,
                      name: product.productName,
                      amount: totalPrice,
                      buyer_email: 'wngml2666@naver.com', // 실제 사용자 이메일
                      buyer_name: '김김김', // 실제 사용자 이름
                      buyer_tel: '010-2222-2222' // 실제 사용자 전화번호
                  }, async function (rsp) {
                      if (rsp.success) {
                          console.log("결제 성공 - Imp UID: " + rsp.imp_uid);

                          try {
                              // 결제 성공 시 결제 정보 저장
                              await axios.post('/api/payments/complete', {
                                  impUid: rsp.imp_uid,
                                  merchantUid: merchantUid
                              });

                              alert('결제가 완료되었습니다.');
                   
                              // navigate();  // 주문 상세 페이지로 이동
                         
                          } catch (error) {
                              alert('결제 정보 저장에 실패하였습니다.');
                              console.log("결제 정보 저장 실패 - Merchant UID: " + merchantUid);
                              console.log("결제 정보 저장 실패 - Imp UID: " + rsp.imp_uid);
                          }
                      } else {
                          alert('결제를 실패하였습니다.');
                      }
                  });
              } else {
                  console.error("IMP 객체를 찾을 수 없습니다.");
              }
          } catch (error) {
              alert('주문 생성에 실패하였습니다.');
              console.error("주문 생성 실패: ", error);
          }
      };

        handlePayment();
    }, [navigate, product, count, totalPrice, user]);

    return (
      <div></div>
        // <div className={styles.container}>
        //     <h1 className={styles.title}>{product.productName}</h1>
        //     <p className={styles.price}>{product.price.toLocaleString()}원</p>
        //     <p className={styles.quantity}>수량: {count}</p>
        //     <p className={styles.totalPrice}>결제 금액: {totalPrice.toLocaleString()}원</p>
        // </div>
    );
};

export default PaymentPage;