import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LikedList.module.css';

//백엔드 api 요청관련 함수
import useHandlers from '../OverLikedHooks/useHandlers';
import useFetchData from '../OverLikedHooks/useFetchData';

const LikedList = () => {
  //승인, 가격보기는 다른 파일로 분리
  const { handleViewPrice, handleApprove } = useHandlers();

  //get요청
  const endpoint = '/admin/liked-packages';
  const { data, loading } = useFetchData(endpoint);

  if (loading) {
    return <div>Loading...</div>;
  }

  // 각 패키지 번호별로 isSelected가 true인지 확인하는 로직 추가
  const packageSelectedStatus = data.reduce((acc, item) => {
    if (!acc[item.packageNum]) {
      acc[item.packageNum] = false;
    }
    if (item.isSelected) {
      acc[item.packageNum] = true;
    }
    return acc;
  }, {});

  return (
    <div>
      <div>응원달성목록</div>
      <table border="1">
        <thead>
          <tr>
            <th>패키지 번호</th>
            <th>Name</th>
            <th>partner</th>
            <th>가격보기</th>
            <th>제안받기</th>
            <th>승인여부</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.listNum}>
              <td>{item.packageNum}</td>
              <td>
                <Link to={`/diy/${item.packageNum}`}>{item.packageName}</Link>
              </td>
              <td>{item.partner}</td>
              <td>
                {item.partner ? (
                  <button onClick={() => handleViewPrice(item)}>보기</button>
                ) : (
                  <span></span>
                )}
              </td>
              <td>
                {packageSelectedStatus[item.packageNum] ? (
                  <span></span>
                ) : (
                  <button onClick={() => handleApprove(item)}>받기</button>
                )}
              </td>
              <td>{item.isSelected ? <span>대기중</span> : <span></span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LikedList;
