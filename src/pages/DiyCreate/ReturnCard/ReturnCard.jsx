import React from 'react';
import styles from './ReturnCard.module.css';

const ReturnCard = ({
  airlineKorean,
  internationalNum,
  city,
  internationalTime,
  onClick,
}) => {
  const handleClick = () => {
    onClick({
      type: 'return',
      airlineKorean,
      internationalNum,
      city,
      internationalTime,
    });
  };

  return (
    <div className={styles.ReturnCard} onClick={handleClick}>
      <span className={styles.airline_name}>{airlineKorean}</span>
      <div className={styles.flight_details}>
        <p>
          <span>{internationalNum}</span> {city} {internationalTime}
        </p>
      </div>
    </div>
  );
};

export default ReturnCard;
