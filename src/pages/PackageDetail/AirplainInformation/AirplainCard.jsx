import styles from './AirplainCard.module.css';

const AirplainCard = () => {
  return (
    <div className={styles.AirplainCard}>
      <span className={styles.airplain_card_badge}>대한항공</span>
      <div className={styles.airplain_card_body}>
        <p>인천(INC) 코타키나발루(BKI)</p>
        <p>2024.06.11(화) 18:55</p>
      </div>
    </div>
  );
};

export default AirplainCard;
