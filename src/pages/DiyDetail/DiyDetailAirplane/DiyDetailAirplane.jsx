import styles from '../DiyDetail.module.css';
import { formatDateTime } from '../../../utils/DateTime';

const DiyDetailAirplane = ({ airline }) => {
  const startTime = formatDateTime(airline.boardingDate);
  const comeTime = formatDateTime(airline.comingDate);
  return (
    <div className={styles.airline_box}>
      <h3>항공편</h3>
      <div className={styles.card_box}>
        <div className={styles.AirplaneCard}>
          <div>항공편: {airline.startFlightNum}</div>
          <div>출발일: {startTime}</div>
          <div className={styles.badge}>{airline.startAirlineName}</div>
          <div className={styles.airport}>
            <div>{airline.startingPoint}</div>
            <div className={styles.to}>to</div>
            <div>{airline.destination}</div>
          </div>
        </div>
        <div className={styles.air_icon_box}>
          <img src="/src/assets/images/airplane.png"></img>
        </div>
        <div className={styles.AirplaneCard}>
          <div>항공편: {airline.comeFlightNum}</div>
          <div>도착일: {comeTime}</div>
          <div className={styles.badge}>{airline.comeAirlineName}</div>
          <div className={styles.airport}>
            <div>{airline.destination}</div>
            <div className={styles.to}>to</div>
            <div>{airline.startingPoint}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiyDetailAirplane;
