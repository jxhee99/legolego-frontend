import React from 'react';
import styles from './StartCard.module.css';

const StartCard = ({
  airlineKorean,
  internationalNum,
  city,
  internationalTime,
  onClick,
}) => {
  const handleClick = () => {
    onClick({
      type: 'start',
      airlineKorean,
      internationalNum,
      city,
      internationalTime,
    });
  };

  return (
    <div className={styles.StartCard} onClick={handleClick}>
      <span className={styles.airline_name}>{airlineKorean}</span>
      <div className={styles.flight_details}>
        <p>
          <span>{internationalNum}</span> {city} {internationalTime}
        </p>
      </div>
    </div>
  );
};

export default StartCard;
