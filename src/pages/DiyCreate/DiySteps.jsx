import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DiyCreate.module.css';

const DiySteps = ({
  step,
  airline,
  route,
  detailCourses,
  routeRange,
  isAllSelected,
}) => {
  // 조건부 className 할당
  const isAirplaneStep = step === 'airplane';
  const isScheduleStep = step === 'schedule';
  const isDiyFormStep = step === 'diy-form';

  const isAirplaneLinkActive = !airline.comeAirlineName && !isAirplaneStep;
  const isScheduleLinkActive =
    route.startDate && airline.comeAirlineName && airline.startAirlineName;
  const isDiyFormLinkActive =
    routeRange.length === detailCourses.length &&
    isAllSelected &&
    airline.comeAirlineName &&
    isScheduleStep;

  return (
    <ul className={styles.diy_create_steps}>
      <div className={styles.lego_box1}>
        <div
          className={`${styles.lego1} ${isAirplaneStep ? styles.active : ''}`}
        ></div>
        <li className={isAirplaneStep ? styles.active : ''}>
          <Link
            to="/diy-create?step=airplane"
            className={isAirplaneLinkActive ? styles.blink : ''}
          >
            항공편
          </Link>
        </li>
      </div>
      <div className={styles.lego_box2}>
        <div
          className={`${styles.lego2} ${isScheduleStep ? styles.active : ''}`}
        ></div>
        <li className={isScheduleStep ? styles.active : ''}>
          {isScheduleLinkActive ? (
            <Link
              to="/diy-create?step=schedule"
              className={isAirplaneStep ? styles.blink : ''}
            >
              일정
            </Link>
          ) : (
            <span>일정</span>
          )}
        </li>
      </div>
      <div className={styles.lego_box3}>
        <div
          className={`${styles.lego3} ${isDiyFormStep ? styles.active : ''}`}
        ></div>
        <li className={isDiyFormStep ? styles.active : ''}>
          {isDiyFormLinkActive ? (
            <Link
              to="/diy-create?step=diy-form"
              className={isScheduleStep ? styles.blink : ''}
            >
              만들기
            </Link>
          ) : (
            <span>만들기</span>
          )}
        </li>
      </div>
    </ul>
  );
};

export default DiySteps;
