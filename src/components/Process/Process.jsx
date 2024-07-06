import React from 'react';
import styles from './Process.module.css';

const ProcessStep = ({ number, title, description }) => {
  return (
    <div className={styles.process_box}>
      <div className={styles.number}>{number}</div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

const Process = () => {
  // 각 단계의 데이터 배열 정의
  const steps = [
    {
      number: 1,
      title: '패키지 제작',
      description: '나만의 DIY 패키지 만들기',
    },
    {
      number: 2,
      title: '응원하기',
      description: '응원 달성 25명 이상',
    },
    {
      number: 3,
      title: '여행사 제안',
      description: '응원 달성 패키지에 여행사 가격 제안',
    },
    {
      number: 4,
      title: '제안 승인',
      description: '패키지 제작자가 여행사 제안 승인',
    },
  ];

  const steps2 = [
    {
      number: 5,
      title: '상품 등록',
      description: '사이트 관리자가 제안 검토 후 승인',
    },
    {
      number: 6,
      title: '상품 구매',
      description: '상품으로 등록된 여행패키지 구매',
    },
    {
      number: 7,
      title: '레고 떠나기',
      description: '즐거운 여행 보내기',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.process}>
        {/* 각 단계마다 ProcessStep 컴포넌트를 반복하여 렌더링 */}
        {steps.map((step, index) => (
          <ProcessStep
            key={index} // 반복되는 요소에는 key prop을 필수로 지정해야 함
            number={step.number}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
      <div className={styles.process}>
        {/* 각 단계마다 ProcessStep 컴포넌트를 반복하여 렌더링 */}
        {steps2.map((step, index) => (
          <ProcessStep
            key={index} // 반복되는 요소에는 key prop을 필수로 지정해야 함
            number={step.number}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Process;
