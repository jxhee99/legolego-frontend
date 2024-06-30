import React from 'react';
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ListTable from '../../../components/List/ListTable';
import styles from '../../../components/List/List.module.css';

const PartnerOrderDetail = ({ orders, onBack }) => {
  const itemsPerPage = 10; // 필요에 따라 조정 가능
  const [page, setPage] = useState(1);

  // 현재 페이지에 해당하는 데이터 계산
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = orders.slice(startIndex, endIndex);

  return (
    <div className={styles.box}>
      <h2>주문 내역</h2>
      <button onClick={onBack} className={styles.back_button}>
        뒤로가기
      </button>
      <ListTable>
        <thead>
          <tr>
            <th>주문 번호</th>
            <th>Price</th>
            <th>인원(수량)</th>
            <th style={{ width: '20%' }}>총 가격</th>
            <th>이름</th>
            <th style={{ width: '20%' }}>이메일</th>
            <th style={{ width: '20%' }}>전화번호</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.orderNum}>
              <td>{item.orderNum}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.totalPrice}</td>
              <td>{item.userName}</td>
              <td>{item.userEmail}</td>
              <td>{item.userPhone}</td>
            </tr>
          ))}
        </tbody>
      </ListTable>
      {/* 페이지네이션 */}
      <div className={styles.pagination_box}>
        <Stack spacing={2} className={styles.pagination}>
          <Pagination
            count={Math.ceil(orders.length / itemsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Stack>
      </div>
    </div>
  );
};

export default PartnerOrderDetail;
