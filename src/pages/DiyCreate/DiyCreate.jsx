import styles from './DiyCreate.module.css';
import { Link, useSearchParams } from 'react-router-dom';
import TouristSpot from './TouristSpot/TouristSpot';
import AirPlane from './Airplane/Airplane';
import Schedule from './Schedule/Schedule';
import PackageForm from './DiyForm/DiyForm';

const DiyCreate = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');

  return (
    <div className={`${styles.DiyCreate} layout`}>
      <div>
        <h2>DIY 패키지 만들기</h2>
        <ol className={styles.diy_create_steps}>
          {/* <li className={step === 'tourist-spot' ? styles.active : ''}>
            <Link to="/diy-create?step=tourist-spot">여행지</Link>
          </li> */}
          <li className={step === 'airplane' ? styles.active : ''}>
            <Link to="/diy-create?step=airplane">항공편</Link>
          </li>
          <li className={step === 'schedule' ? styles.active : ''}>
            <Link to="/diy-create?step=schedule">일정</Link>
          </li>
          <li className={step === 'diy-form' ? styles.active : ''}>
            <Link to="/diy-create?step=diy-form">레고 만들기</Link>
          </li>
        </ol>
      </div>

      {step === 'tourist-spot' && <TouristSpot />}
      {step === 'airplane' && <AirPlane />}
      {step === 'schedule' && <Schedule />}
      {step === 'diy-form' && <PackageForm />}
    </div>
  );
};

export default DiyCreate;
