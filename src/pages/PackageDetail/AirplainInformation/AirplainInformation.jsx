import styles from '../PackageDetail.module.css';
import AirplainCard from './AirplainCard';

const AirplainInformation = () => {
  return (
    <section className={styles.AirplainInformation}>
      <h3>항공편</h3>
      <div className={styles.airplain_information_cards}>
        <AirplainCard />
        <AirplainCard />
      </div>
    </section>
  );
};

export default AirplainInformation;
