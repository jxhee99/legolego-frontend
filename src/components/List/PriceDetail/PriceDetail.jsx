import React from 'react';
import styles from './PriceDetail.module.css';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import PaidIcon from '@mui/icons-material/Paid';
import ArticleIcon from '@mui/icons-material/Article';

const PriceDetail = ({ selectedItem }) => {
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
