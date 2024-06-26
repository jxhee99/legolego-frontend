import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OrderList.module.css';
import { useNavigate } from 'react-router-dom';

const OrderList=()=>{
  const navigate = useNavigate();
  const goToOrderDetail=()=>{
    navigate('/order-detail')
  }
  return(
    <div className={styles.OrderList}>
      <div>
    <h2>
      결제내역
    </h2>
    </div>
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
        <td>1</td>
        <td onClick={goToOrderDetail}>일본 온천 여행</td>
        <td>999,000</td>
        <td>1</td>
        <td>999,000</td>
        <td>결제완료</td>
        <td>작성완료</td>
      </tbody>
      <tbody>
        <td>2</td>
        <td>베트남 배낭여행</td>
        <td>1200,000</td>
        <td>2</td>
        <td>2400,000</td>
        <td>결제대기</td>
        <td>작성대기</td>
      </tbody>
    </table>
    </div>
  );
};

export default OrderList;
