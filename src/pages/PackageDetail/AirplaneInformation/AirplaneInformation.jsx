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
      <div className={styles.airline_card}>
        <div className={styles.start_airline}>
          <h4>가는날</h4>
          <div>
            <span>{startAirlineName}</span>
            <span>{startFlightNum}</span>
          </div>
          <div>
            <p>{startingPoint}</p>
            <p>{formatDateTime(boardingDate)}</p>
          </div>
        </div>
        <div className={styles.comming_airline}>
          <h4>오는날</h4>
          <div>
            <span>{comeAirlineName}</span>
            <span>{comeFlightNum}</span>
          </div>
          <div>
            <p>{destination}</p>
            <p>{formatDateTime(comingDate)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirplaneInformation;
