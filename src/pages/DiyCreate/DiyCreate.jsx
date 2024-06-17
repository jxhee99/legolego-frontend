import styles from './DiyCreate.module.css';
import { Link, Outlet } from 'react-router-dom';

const DiyCreate = () => {
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
      <Outlet></Outlet>
    </div>
  );
};

export default DiyCreate;
