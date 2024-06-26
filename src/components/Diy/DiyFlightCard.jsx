import React from 'react';
import styles from './DiyFlightCard.module.css';
import { formatDateTime } from '../../utils/DateTime';

const DiyFlightCard = ({ flight, type }) => {
  const formattedDate = formatDateTime(flight.date);

  return (
    <div className={styles.AirplaneCard}>
      <div>항공편: {flight.flightNum}</div>
      <div>
        {type === 'departure' ? '출발일' : '도착일'}: {formattedDate}
      </div>
      <div className={styles.badge}>{flight.airlineName}</div>
      <div className={styles.airport}>
        <div>{flight.startingPoint}</div>
        <div className={styles.to}>to</div>
        <div>{flight.destination}</div>
      </div>
    </div>
  );
};

export default DiyFlightCard;
