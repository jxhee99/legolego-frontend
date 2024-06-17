import styles from '../../DiyCreate/DiyCreate.module.css';
import MapComponent from '../Schedule/MapComponent';
import DiyItem from '../../../components/Card/DiyItem/DiyItem';

const DiyCreateSchedule = () => {
  return (
    <div className={styles.DiyCreateSchedule}>
      <h3>관광지와 맛집을 검색하여 일정을 만들어보세요!</h3>
      <MapComponent />
      <div className={styles.schedules}>
        <DiyItem title="dd" imageUrl="https://picsum.photos/300/200" />
      </div>
    </div>
  );
};

export default DiyCreateSchedule;
