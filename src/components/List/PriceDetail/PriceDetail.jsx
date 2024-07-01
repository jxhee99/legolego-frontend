import React from 'react';
import styles from './PriceDetail.module.css';

const PriceDetail = ({ selectedItem }) => {
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
      <div className={styles.suggest_box}>
        <span>가격 :</span>
        <p>{selectedItem.price}</p>
        <span>모집 인원 :</span>
        <p>{selectedItem.necessaryPeople}</p>
        <span>특별 혜택 :</span>
        <p>{selectedItem.specialBenefits}</p>
      </div>
    </div>
  );
};

export default PriceDetail;
