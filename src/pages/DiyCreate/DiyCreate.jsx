import styles from './DiyCreate.module.css';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DiySteps from './DiySteps';
import AirPlane from './Airplane/Airplane';
import Schedule from './Schedule/Schedule';
import PackageForm from './DiyForm/DiyForm';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAirline,
  selectRoute,
  selectDetailCourses,
  resetForm,
} from '../../_slices/diySlice';
import {
  createDateRange,
  checkAllCoursesNotEmpty,
} from './Schedule/scheduleUtil';

const DiyCreate = () => {
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetForm());
  }, []);

  return (
    <div className={`${styles.DiyCreate} layout`}>
      <div>
        <h2>DIY 패키지 만들기</h2>
        <DiySteps
          step={step}
          airline={airline}
          route={route}
          detailCourses={detailCourses}
          routeRange={routeRange}
          isAllSelected={isAllSelected}
        />
      </div>

      {step === 'airplane' && <AirPlane />}
      {step === 'schedule' && <Schedule />}
      {step === 'diy-form' && <PackageForm />}
    </div>
  );
};

export default DiyCreate;
