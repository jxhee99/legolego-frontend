import styles from './DiyCreate.module.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LegoBox from './Desgin/LegoBox';
import Draft from './Draft/Draft';
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
  // 애니메이션 효과
  const [showLegoBox, setShowLegoBox] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    dispatch(resetForm());
    if (step === null) {
      const timer = setTimeout(() => {
        setShowLegoBox(false);
        setIsAnimated(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [dispatch]);

  return (
    <div className={`${styles.DiyCreate} layout`}>
      {showLegoBox && step === null ? (
        <LegoBox />
      ) : (
        <div className={isAnimated ? styles.diyStepsEnter : ''}>
          <h3>DIY 레고 만들기</h3>
          <DiySteps
            step={step}
            airline={airline}
            route={route}
            detailCourses={detailCourses}
            routeRange={routeRange}
            isAllSelected={isAllSelected}
          />
        </div>
      )}
      {!showLegoBox && step === null && <Draft />}
      {step === 'airplane' && <AirPlane />}
      {step === 'schedule' && <Schedule />}
      {step === 'diy-form' && <PackageForm />}
    </div>
  );
};

export default DiyCreate;
