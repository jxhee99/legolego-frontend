import styles from './AirplaneCard.module.css';

const AirplaneCard = () => {
  return (
    <div className={styles.AirplaneCard}>
      <span className={styles.badge}>대한항공</span>
      <div className={styles.body}>
        <p>인천(INC) 코타키나발루(BKI)</p>
        <p>2024.06.11(화) 18:55</p>
      </div>
    </div>
  );
};

export default AirplaneCard;
