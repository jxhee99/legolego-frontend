import styles from './DiyCreate.module.css';
import { Link, useSearchParams } from 'react-router-dom';
import TouristSpot from './TouristSpot/TouristSpot';
import AirPlane from './Airplane/Airplane';
import Schedule from './Schedule/Schedule';

const DiyCreate = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');

  return (
    <div className={`${styles.DiyCreate} layout`}>
      <div>
        <h2>DIY 패키지 만들기</h2>
        <ol className={styles.diy_create_steps}>
          <li>
            <Link to="/diy-create?step=tourist-spot">여행지</Link>
          </li>
          <li>
            <Link to="/diy-create?step=airplane">항공편</Link>
          </li>
          <li>
            <Link to="/diy-create?step=schedule">일정</Link>
          </li>
        </ol>
      </div>

      {step === 'tourist-spot' && <TouristSpot />}
      {step === 'airplane' && <AirPlane />}
      {step === 'schedule' && <Schedule />}
    </div>
  );
};

export default DiyCreate;
