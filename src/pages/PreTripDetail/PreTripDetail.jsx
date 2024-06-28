import styles from './PreTripDetail.module.css';
import PackageInformation from './PackageInformation/PackageInformation';
import AirplaneInformation from './AirplaneInformation/AirplaneInformation';
import Schedule from './ScheduleInformation/ScheduleInformation';
import PreTripComment from './PreTripComment/PreTripComment';

const PreTripDetail = () => 
  {
  return (
    <div className={`${styles.PreTripDetail} layout`}>
      <PackageInformation />
      <div className={styles.preTripDetail_review_box}>
      <PreTripComment/>
      </div>
      <div className={styles.preTripDetail_box}>
      <AirplaneInformation />
      <Schedule />
      </div>
    </div>
  );
};

export default PreTripDetail;
