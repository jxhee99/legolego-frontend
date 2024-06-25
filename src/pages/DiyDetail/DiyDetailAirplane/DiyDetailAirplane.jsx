import styles from '../DiyDetail.module.css';
import { formatDateTime } from '../../../utils/DateTime';

const FlightCard = ({
  flightNum,
  date,
  airlineName,
  startingPoint,
  destination,
  type,
}) => {
  const formattedDate = formatDateTime(date);
  return (
    <div className={styles.AirplaneCard}>
      <div>항공편: {flightNum}</div>
      <div>
        {type === 'departure' ? '출발일' : '도착일'}: {formattedDate}
      </div>
      <div className={styles.badge}>{airlineName}</div>
      <div className={styles.airport}>
        <div>{startingPoint}</div>
        <div className={styles.to}>to</div>
        <div>{destination}</div>
      </div>
    </div>
  );
};

const DiyDetailAirplane = ({ airline }) => {
  return (
    <div className={styles.airline_box}>
      <h3>항공편</h3>
      <div className={styles.card_box}>
        <FlightCard
          type="departure"
          flightNum={airline.startFlightNum}
          date={airline.boardingDate}
          airlineName={airline.startAirlineName}
          startingPoint={airline.startingPoint}
          destination={airline.destination}
        />
        <div className={styles.air_icon_box}>
          <img src="/src/assets/images/airplane.png" alt="Airplane" />
        </div>
        <FlightCard
          type="arrival"
          flightNum={airline.comeFlightNum}
          date={airline.comingDate}
          airlineName={airline.comeAirlineName}
          startingPoint={airline.destination}
          destination={airline.startingPoint}
        />
      </div>
    </div>
  );
};

export default DiyDetailAirplane;
