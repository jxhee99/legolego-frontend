import styles from './AirplaneInformation.module.css';
import { formatDateTime } from '../../../utils/DateTime';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';

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
    <section className={styles.section}>
      <h3 className={styles.title}>항공편 정보</h3>
      <div className={styles.airlineCard}>
        <div className={styles.airlineInfo}>
          <h4 className={styles.subtitle}>
            <FlightTakeoffIcon className={styles.icon} /> 출발
          </h4>
          <div className={styles.flightDetails}>
            <span className={styles.airlineName}>{startAirlineName}</span>
            <span className={styles.flightNumber}>{startFlightNum}</span>
          </div>
          <div className={styles.tripInfo}>
            <p className={styles.location}>{startingPoint}</p>
            <p className={styles.dateTime}>{formatDateTime(boardingDate)}</p>
          </div>
        </div>
        <div className={styles.separator}></div>
        <div className={styles.airlineInfo}>
          <h4 className={styles.subtitle}>
            <FlightLandIcon className={styles.icon} /> 도착
          </h4>
          <div className={styles.flightDetails}>
            <span className={styles.airlineName}>{comeAirlineName}</span>
            <span className={styles.flightNumber}>{comeFlightNum}</span>
          </div>
          <div className={styles.tripInfo}>
            <p className={styles.location}>{destination}</p>
            <p className={styles.dateTime}>{formatDateTime(comingDate)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirplaneInformation;
