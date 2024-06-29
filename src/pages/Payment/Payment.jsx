import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import styles from './Payment.module.css';
import axios from 'axios';

const PaymentPage = () => {
    const { state } = useLocation();
    const { product, count, totalPrice, orderData, merchantUid} = state;
    const navigate = useNavigate();

    useEffect(() => {
      const handlePayment = async () => {
          try {
            
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
                      buyer_email: orderData.userEmail, // 실제 사용자 이메일
                      buyer_name: orderData.userName, // 실제 사용자 이름
                    //   buyer_tel: orderData.userPhone // 실제 사용자 전화번호
                  }, async function (rsp) {
                      if (rsp.success) {
                          console.log("결제 성공 - Imp UID: " + rsp.imp_uid);

                          try {
                                const token = localStorage.getItem('token');
                                if(!token) {
                                    console.error("토큰을 찾지 못했습니다.");
                                    return;
                                }
                              // 결제 성공 시 결제 정보 저장
                              await axios.post('/api/user/payments/complete', {
                                  impUid: rsp.imp_uid,
                                  merchantUid: merchantUid
                              }, {
                                headers : {
                                    'Content-Type' : 'application/json',
                                    Authorization : `Bearer ${token}`,
                                }
                              });

                              alert('결제가 완료되었습니다.');
                              navigate(`/order-Detail/${orderData.orderNum}`);  // 주문 상세 페이지로 이동
                              //{state : {orderNum : orderData.orderNum}}
                         
                          } catch (error) {
                              alert('결제 정보 저장에 실패하였습니다.');
                              console.log("결제 정보 저장 실패 - Merchant UID: " + merchantUid);
                              console.log("결제 정보 저장 실패 - Imp UID: " + rsp.imp_uid);
                          }
                      } else {
                          alert('결제를 실패하였습니다.');
                          navigate(`/order/${product.productNum}`);
                      }
                  });
              } else {
                  console.error("IMP 객체를 찾을 수 없습니다.");
                  navigate(`/order/${product.productNum}`);
              }
          } catch (error) {
              alert('주문 생성에 실패하였습니다.');
              console.error("주문 생성 실패: ", error);
              navigate(`/order/${product.productNum}`);
          }
      };

        handlePayment();
    }, [navigate, product, count, totalPrice, orderData]);

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