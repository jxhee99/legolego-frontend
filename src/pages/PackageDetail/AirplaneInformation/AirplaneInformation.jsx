import styles from '../PackageDetail.module.css';
import AirplaneCard from './AirplaneCard';

const AirplaneInformation = () => {
  return (
    <section className={styles.AirplaneInformation}>
      <h3>항공편</h3>
      <div className={styles.airplane_information_cards}>
        <AirplaneCard />
        <AirplaneCard />
      </div>
    </section>
  );
};

export default AirplaneInformation;
