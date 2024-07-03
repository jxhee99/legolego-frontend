import React from 'react';
import styles from './SelectPrice.module.css';
import apiClient from '../../../api/apiClient';

const SelectPrice = ({ selectedItem, refetch, closeModal }) => {
  // 승인 요청
  const handleApprove = async (item) => {
    try {
      const response = await apiClient.post(
        `/user/accept?list_num=${item.listNum}&package_num=${selectedItem.diyPackage.packageNum}`);

      if (response.status === 200) {
        console.log('승인');
        closeModal();
        refetch();
      } else {
        console.error('승인 실패:', response.status);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };
  return (
    <div className={styles.confirm_modal_inner}>
      <p>제안을 받으시겠습니까?</p>
      <div>
        <button onClick={(e) => handleApprove(selectedItem)}>수락</button>
        <button onClick={closeModal}>취소</button>
      </div>
    </div>
  );
};

export default SelectPrice;
