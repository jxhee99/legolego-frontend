import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ImageSlide.module.css';
import Process from '../../../components/Process/Process';

const GoDiyList = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/partner/lists/packages');
  };

  return (
    <div className={styles.go_diy}>
      <div className={styles.go_button_box} onClick={handleButtonClick}>
        <p>레고러들이 가고 싶어하는 여행을 확인해 보세요</p>
        <button>→</button>
      </div>
    </div>
  );
};

const GoPriceList = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/partner/lists/prices');
  };

  return (
    <div className={styles.go_price}>
      <div className={styles.go_button_box} onClick={handleButtonClick}>
        <p>작성자가 제안을 수락하면 정식 상품으로 등록돼요</p>
        <button>→</button>
      </div>
    </div>
  );
};

const GoOrderList = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/partner/lists/orders');
  };

  return (
    <div className={styles.go_order}>
      <div className={styles.go_button_box} onClick={handleButtonClick}>
        <p>주문 내역을 확인 해보세요!</p>
        <button>→</button>
      </div>
    </div>
  );
};

const ImageSlide = () => {
  const components = [
    <GoDiyList key="diy" />,
    <GoPriceList key="price" />,
    <GoOrderList key="order" />,
    <Process key="process" />,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
    }, 5000); // 5초마다 슬라이드 변경
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
  }, [components.length]);

  return (
    <div className={styles.container}>
      {components.map((Component, index) => (
        <div
          key={index}
          className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
          style={{ zIndex: index === currentIndex ? 1 : 0 }} // 활성 슬라이드는 z-index를 높여서 위에 보이게 함
        >
          {Component}
        </div>
      ))}
    </div>
  );
};

export default ImageSlide;
