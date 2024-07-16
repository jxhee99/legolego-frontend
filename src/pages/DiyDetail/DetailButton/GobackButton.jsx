import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../DiyDetail.module.css';

const GobackButton = () => {
  const navigate = useNavigate();
  const handleGoback = () => {
    navigate(-1);
    //스크롤 위치 DIY메인 중간 쯤으로 조작을 위한 함수
    setTimeout(() => {
      const middlePosition =
        (document.documentElement.scrollHeight - window.innerHeight) / 2;
      window.scrollTo({
        top: middlePosition,
        behavior: 'smooth', // 부드럽게 스크롤
      });
    }, 300);
  };
  return (
    <button className={styles.go_back} onClick={handleGoback}>
      뒤로가기
    </button>
  );
};

export default GobackButton;
