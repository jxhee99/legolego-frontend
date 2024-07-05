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
  return (
    <ul className={styles.diy_create_steps}>
      <li className={step === 'airplane' ? styles.active : ''}>
        <Link
          to="/diy-create?step=airplane"
          className={
            !airline.comeAirlineName && step !== 'airplane' ? styles.blink : ''
          }
        >
          항공편
        </Link>
      </li>
      <li className={step === 'schedule' ? styles.active : ''}>
        {route.startDate ? (
          <Link
            to="/diy-create?step=schedule"
            className={step === 'airplane' ? styles.blink : ''}
          >
            일정
          </Link>
        ) : (
          <span>일정</span>
        )}
      </li>
      <li className={step === 'diy-form' ? styles.active : ''}>
        {routeRange.length === detailCourses.length &&
        isAllSelected &&
        airline.comeAirlineName ? (
          <Link
            to="/diy-create?step=diy-form"
            className={step === 'schedule' ? styles.blink : ''}
          >
            레고 만들기
          </Link>
        ) : (
          <span>레고 만들기</span>
        )}
      </li>
    </ul>
  );
};

export default DiySteps;
