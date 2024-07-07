import React from 'react';
import { useState } from 'react';
import styles from './PriceRegister.module.css';
import apiClient from '../../../api/apiClient';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ArticleIcon from '@mui/icons-material/Article';

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
      const response = await apiClient.post(
        `/partner/over-liked-packages/offer`,
        formData
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
      <div className={styles.subtitle}>
        <SmartToyIcon />
        <h3>패키지</h3>
      </div>
      <div className={styles.diy_box}>
        <img src={selectedItem.diyPackage.profileImg}></img>
        <div className={styles.text_box}>
          <div className={styles.date_user}>
            <p>{selectedItem.diyPackage.regDate}</p>
            <p>{selectedItem.diyPackage.user.userNickname}</p>
          </div>
          <h3>{selectedItem.diyPackage.packageName}</h3>
          <p>{selectedItem.diyPackage.shortDescription}</p>
          <div>
            여행기간 |{' '}
            {new Date(
              selectedItem.diyPackage.airline.boardingDate
            ).toLocaleDateString()}
            ~
            {new Date(
              selectedItem.diyPackage.airline.comingDate
            ).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.subtitle}>
        <ArticleIcon />
        <h3>제안</h3>
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
