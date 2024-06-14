import styles from './PackageDetail.module.css';
import PackageInformation from './PackageInformation/PackageInformation';
import AirplainInfomation from './AirplainInformation/AirplainInformation';
import Schedule from './Schedule/Schedule';

const PackageDetail = () => {
  return (
    <div className={`${styles.PackageDetail} layout`}>
      <PackageInformation />
      <AirplainInfomation />
      <Schedule />
    </div>
  );
};

export default PackageDetail;
