import styles from '../DiyCreate/DiyCreate.module.css';
import { Link, useSearchParams } from 'react-router-dom';
import AirPlane from './Airplane/Airplane';
import Schedule from './Schedule/Schedule';
import PackageForm from './DiyForm/DiyForm';
import { useSelector } from 'react-redux';
import {
  selectAirline,
  selectRoute,
  selectDetailCourses,
} from '../../_slices/diySlice';
import {
  createDateRange,
  checkAllCoursesNotEmpty,
} from './Schedule/scheduleUtil';

const DiyEdit = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');
  const airline = useSelector(selectAirline);
  const route = useSelector(selectRoute);
  const detailCourses = useSelector(selectDetailCourses);
  const routeRange =
    route.startDate && route.lastDate
      ? createDateRange(route.startDate, route.lastDate)
      : [];
  const isAllSelected = checkAllCoursesNotEmpty(detailCourses);

  return (
    <div className={`${styles.DiyCreate} layout`}>
      <div>
        <h2>DIY 패키지 만들기</h2>
        <ol className={styles.diy_create_steps}>
          {/* <li className={step === 'tourist-spot' ? styles.active : ''}>
            <Link to="/diy-create?step=tourist-spot">여행지</Link>
          </li> */}
          <li className={step === 'airplane' ? styles.active : ''}>
            <Link
              to="/diy-edit/:id?step=airplane"
              className={
                !airline.comeAirlineName && step != 'airplane'
                  ? styles.blink
                  : ''
              }
            >
              항공편
            </Link>
          </li>
          <li className={step === 'schedule' ? styles.active : ''}>
            {route.startDate ? (
              <Link
                to="/diy-edit/:id?step=schedule"
                className={step === 'airplane' ? styles.blink : ''}
              >
                일정
              </Link>
            ) : (
              <span>일정</span>
            )}
          </li>
          <li className={step === 'diy-form' ? styles.active : ''}>
            {routeRange.length === detailCourses.length &&
            isAllSelected &&
            airline.comeAirlineName ? (
              <Link
                to="/diy-edit/:id?step=diy-form"
                className={step === 'schedule' ? styles.blink : ''}
              >
                레고 만들기
              </Link>
            ) : (
              <span>레고 만들기</span>
            )}
          </li>
        </ol>
      </div>

      {step === 'airplane' && <AirPlane />}
      {step === 'schedule' && <Schedule />}
      {step === 'diy-form' && <PackageForm />}
    </div>
  );
};

export default DiyEdit;
