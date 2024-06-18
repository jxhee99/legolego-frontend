import Description from './Description/Description';
import styles from './DiyDetail.module.css';
import DiyDetailAirplane from './DiyDetailAirplane/DiyDetailAirplane';
import DiyDetailSchedule from './DiyDetailSchedule/DiyDetailSchedule';

const DiyDetail = () => {
  return (
    <div className={styles.DiyDetail}>
      <Description />
      <DiyDetailSchedule />
      <DiyDetailAirplane />
    </div>
  );
};

export default DiyDetail;
