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
    <section className={styles.flightInfo}>
      <h2 className={styles.title}>항공편 정보</h2>
      <div className={styles.flightCard}>
        <div className={styles.flightLeg}>
          <div className={styles.flightHeader}>
            <FlightTakeoffIcon className={styles.icon} />
            <h3 className={styles.legTitle}>출발</h3>
          </div>
          <div className={styles.flightDetails}>
            <div className={styles.airline}>
              <span className={styles.airlineName}>{startAirlineName}</span>
              <span className={styles.flightNumber}>{startFlightNum}</span>
            </div>
            <div className={styles.route}>
              <p className={styles.location}>{startingPoint}</p>
              <p className={styles.dateTime}>{formatDateTime(boardingDate)}</p>
            </div>
          </div>
        </div>
        <div className={styles.flightLeg}>
          <div className={styles.flightHeader}>
            <FlightLandIcon className={styles.icon} />
            <h3 className={styles.legTitle}>도착</h3>
          </div>
          <div className={styles.flightDetails}>
            <div className={styles.airline}>
              <span className={styles.airlineName}>{comeAirlineName}</span>
              <span className={styles.flightNumber}>{comeFlightNum}</span>
            </div>
            <div className={styles.route}>
              <p className={styles.location}>{destination}</p>
              <p className={styles.dateTime}>{formatDateTime(comingDate)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirplaneInformation;
