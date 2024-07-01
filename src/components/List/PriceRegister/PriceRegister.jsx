import React from 'react';
import { useState } from 'react';
import styles from './PriceRegister.module.css';
import axios from 'axios';

const PriceRegister = ({ selectedItem, closeModal, refetch }) => {
  const [price, setPrice] = useState('');
  const [necessaryPeople, setNecessaryPeople] = useState('');
  const [specialBenefits, setSpecialBenefits] = useState('');

  const handleInputChange = (setValue) => (e) => {
    const value = e.target.value;
    setValue(value);
  };

  // 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      packageNum: selectedItem.diyPackage.packageNum,
      price,
      necessaryPeople,
      specialBenefits,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/partner/over-liked-packages/offer`,
        formData,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        closeModal();
        refetch();
      }
    } catch (err) {
      console.error('제안 등록 중 오류:', err);
    }
  };

  return (
    <div className={styles.modal_box}>
      <div className={styles.diy_box}>
        <img src={selectedItem.diyPackage.profileImg}></img>
        <div className={styles.text}>
          <span>name :</span>
          <p>{selectedItem.diyPackage.packageName}</p>
          <span>설명 :</span>
          <p>{selectedItem.diyPackage.shortDescription}</p>
          <span>작성자 :</span>
          <p>{selectedItem.diyPackage.user.userNickname}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.form_box}>
        <label>제안 가격:</label>
        <input
          type="text"
          name="price"
          value={price}
          onChange={handleInputChange(setPrice)}
          required
        />
        <br />
        <label>모집 인원:</label>
        <input
          type="text"
          name="necessaryPeople"
          value={necessaryPeople}
          onChange={handleInputChange(setNecessaryPeople)}
          required
        />
        <br />
        <label>특별 혜택:</label>
        <input
          type="text"
          name="specialBenefits"
          value={specialBenefits}
          onChange={handleInputChange(setSpecialBenefits)}
          required
        />
        <br />
        <div className={styles.button_box}>
          <button type="submit">등록하기</button>
        </div>
      </form>
    </div>
  );
};

export default PriceRegister;
