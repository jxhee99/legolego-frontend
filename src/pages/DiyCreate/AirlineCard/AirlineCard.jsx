import React from 'react';
import styles from './AirlineCard.module.css';

const AirlineCard = ({
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
    <div className={styles.AirlineCard} onClick={handleClick}>
      <span>{airlineKorean}</span>
      <hr />
      <div>
        <p>
          <span>{internationalNum}</span> {city} {internationalTime} - {city}
        </p>
      </div>
    </div>
  );
};

export default AirlineCard;
