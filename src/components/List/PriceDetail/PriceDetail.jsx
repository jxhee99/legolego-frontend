import React from 'react';
import styles from './PriceDetail.module.css';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import PaidIcon from '@mui/icons-material/Paid';

const PriceDetail = ({ selectedItem }) => {
  return (
    <div className={styles.modal_box}>
      <div className={styles.diy_box}>
        <img src={selectedItem.diyPackage.profileImg}></img>
        <div className={styles.text_box}>
          <div className={styles.date_user}>
            <p>{selectedItem.diyPackage.regDate}</p>
            <p>{selectedItem.diyPackage.user.userNickname}</p>
          </div>
          <h4>패키지명: {selectedItem.diyPackage.packageName}</h4>
          <p>설명: {selectedItem.diyPackage.shortDescription}</p>
          <p>목적지: {selectedItem.diyPackage.airline.destination}</p>
          <p>
            여행기간 |
            {new Date(
              selectedItem.diyPackage.airline.boardingDate
            ).toLocaleDateString()}
            ~
            {new Date(
              selectedItem.diyPackage.airline.comingDate
            ).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className={styles.suggest_box}>
        <div>
          <div className={styles.subtitle}>
            <PaidIcon />
            <h4>가격 :</h4>
          </div>
          <p>{selectedItem.price}원</p>
        </div>
        <div>
          <div className={styles.subtitle}>
            <PeopleIcon />
            <h4>모집 인원 :</h4>
          </div>
          <p>{selectedItem.necessaryPeople}명</p>
        </div>
        <div>
          <div className={styles.subtitle}>
            <StarIcon />
            <h4>특별 혜택 :</h4>
          </div>
          <p className={styles.benefit_text}>{selectedItem.specialBenefits}</p>
        </div>
      </div>
    </div>
  );
};

export default PriceDetail;
