import styles from './AirplaneInformation.module.css';
import { formatDateTime } from '../../../utils/DateTime';

const AirplaneInformation = ({
  startAirlineName,
  startingPoint,
  startFlightNum,
  boardingDate,
  destination,
  comeAirlineName,
  comeFlightNum,
  comingDate,
}) => {
  return (
    <section className={styles.AirplaneInformation}>
      <h3>항공편</h3>
      <div className={styles.flight}>
        <div className={styles.flight_box}>
          <div className={styles.flight_departure}>
            <span className={styles.time}>
              {formatDateTime(boardingDate).substring(11, 16)}
            </span>
            <span className={styles.date}>
              {formatDateTime(boardingDate).replace(/\s\d{2}:\d{2}$/, '')}
            </span>
            <span className={styles.country}>{startingPoint} 출발</span>
            <div className={styles.airplane}>
              <span>{startAirlineName}</span>
              <span>{startFlightNum}</span>
            </div>
          </div>
          <div className={styles.flight_arrive}>
            <span className={styles.time}>
              {formatDateTime(comingDate).substring(11, 16)}
            </span>
            <span className={styles.date}>
              {formatDateTime(comingDate).replace(/\s\d{2}:\d{2}$/, '')}
            </span>
            <span className={styles.country}>{destination} 도착</span>
            <div className={styles.airplane}>
              <span>{comeAirlineName}</span>
              <span>{comeFlightNum}</span>
            </div>
          </div>
          <div className={styles.flight_time}>
            <span className={styles.flight_point}></span>
            <div className={styles.airplane}>
              <span className={styles.flight_line}></span>
              <span className={styles.flight_point}></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirplaneInformation;
