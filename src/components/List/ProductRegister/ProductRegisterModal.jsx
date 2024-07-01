import React, { useState } from 'react';
import axios from 'axios';
import styles from './ProductRegisterModal.module.css';
import PriceDetail from '../PriceDetail/PriceDetail';
import { combineDateTime } from '../../../utils/DateTime';

const ProductRegisterModal = ({ selectedItem, closeModal, refetch }) => {
  const [deadlineDate, setDeadlineDate] = useState(null);
  const [deadlineTime, setDeadlineTime] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to manage view

  const handleInputChange = (setValue) => (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const combinedDateTime = combineDateTime(deadlineDate, deadlineTime);
      if (!combinedDateTime) {
        console.error('날짜와 시간을 선택해주세요');
        return;
      }

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/admin/register?list_num=${selectedItem.listNum}&recruitment_dead_line=${combinedDateTime}`,
        {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('승인');
        refetch();
      } else {
        console.error('승인 실패:', response.status);
      }
      closeModal();
    } catch (err) {
      console.error('상품 등록 중 오류:', err);
    }
  };

  return (
    <>
      {showForm ? (
        <form onSubmit={handleSubmit} className={styles.modal_form}>
          <h4>모집 마감기한</h4>
          <label>날짜</label>
          <input
            type="date"
            value={deadlineDate}
            onChange={handleInputChange(setDeadlineDate)}
          />
          <br />
          <label>시간</label>
          <input
            type="time"
            value={deadlineTime}
            onChange={handleInputChange(setDeadlineTime)}
          />
          <div className={styles.button_box}>
            <button type="submit" className={styles.submit_button}>
              등록
            </button>
            <button type="button" onClick={() => setShowForm(false)}>
              뒤로가기
            </button>
          </div>
        </form>
      ) : (
        <>
          <PriceDetail selectedItem={selectedItem} />
          <button
            className={styles.input_button}
            onClick={() => setShowForm(true)}
          >
            기한 입력
          </button>
        </>
      )}
    </>
  );
};

export default ProductRegisterModal;
