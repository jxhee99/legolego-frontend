import styles from './Airplane.module.css';
import ControllableStates from './ControllableStates/ControllableStates';

const DiyCreateAirplane = ({ children }) => {
  return (
    <>
      <div className={styles.DiyCreateAirplane}>
        <ControllableStates labelName="출발지" />
        <ControllableStates labelName="도착지" />
        <input type="date" />
        <input type="date" />
        <button className={styles.button}>검색</button>
      </div>
      {children}
    </>
  );
};

export default DiyCreateAirplane;
