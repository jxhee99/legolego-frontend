import { useState } from 'react';

const useHandlers = () => {

  const handleApprove = async (item) => {
    try {
      //await axios.post(`/`);
      console.log(`패키지 ${item.partner} 승인됨`);
    } catch (err) {
      console.error('승인 처리 중 오류:', err);
    }
  };

  const handleViewPrice = async (item) => {
    try {
      //await axios.get(`/myPage/offers/{user_num}/{item.list_num}`)
      console.log(`패키지 ${item.partner} 가격 보기`);
    } catch (err) {
      console.error('가격 조회 중 오류:', err);
    }
  };




  return { handleApprove, handleViewPrice };
};

export default useHandlers;
