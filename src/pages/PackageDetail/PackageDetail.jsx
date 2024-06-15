import styles from './PackageDetail.module.css';
import PackageInformation from './PackageInformation/PackageInformation';
import AirplaneInfomation from './AirplaneInformation/AirplaneInformation';
import Schedule from './ScheduleInformation/ScheduleInformation';

const PackageDetail = () => {
  return (
    <div className={`${styles.PackageDetail} layout`}>
      <PackageInformation />
      <AirplaneInfomation />
      <Schedule />
    </div>
  );
};

export default PackageDetail;
