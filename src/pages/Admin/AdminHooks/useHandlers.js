import { useState } from 'react';

const useHandlers = () => {

  const handleApprove = async (item) => {
    try {
      //await axios.post(`/admin/likes-packages/${item.listNum}/approve`);
      console.log(`패키지 ${item.packageNum} 승인됨`);
    } catch (err) {
      console.error('승인 처리 중 오류:', err);
    }
  };

  const handleReject = async (item) => {
    try {
      //await axios.post(`/admin/likes-packages/${item.listNum}/reject`);
      console.log(`패키지 ${item.packageNum} 거절됨`);
    } catch (err) {
      console.error('거절 처리 중 오류:', err);
    }
  };

  const handleViewPrice = async (item) => {
    try {
      console.log(`패키지 ${item.packageNum} 가격 보기`);
    } catch (err) {
      console.error('가격 조회 중 오류:', err);
    }
  };




  return { handleApprove, handleReject, handleViewPrice };
};

export default useHandlers;
