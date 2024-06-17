import styles from '../DiyDetail.module.css';
import DiyItem from '../../../components/Card/DiyItem/DiyItem';

const DiyDetailSchedule = () => {
  return (
    <div>
      <h3>여행 일정</h3>
      <DiyItem detail={true} />
    </div>
  );
};

export default DiyDetailSchedule;
