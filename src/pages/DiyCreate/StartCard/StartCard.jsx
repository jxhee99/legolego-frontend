import React from 'react';
import styles from './StartCard.module.css';

const ReturnCard = ({
  airlineKorean,
  internationalNum,
  city,
  internationalTime,
  onClick,
}) => {
  const handleClick = () => {
    onClick({ airlineKorean, internationalNum, city, internationalTime });
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

export default ReturnCard;
