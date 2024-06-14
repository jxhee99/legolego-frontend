import styles from './PackageDetail.module.css';
import AirplainInfomation from './AirplainInformation/AirplainInformation';
import Schedule from './Schedule/Schedule';

const PackageDetail = () => {
  return (
    <>
      <AirplainInfomation />
      <Schedule />
    </>
  );
};

export default PackageDetail;
