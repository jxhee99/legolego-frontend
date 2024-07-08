import { useEffect } from 'react';
import styles from '../DiyCreate/DiyCreate.module.css';
import { useState } from 'react';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import LegoHead from '../../pages/DiyCreate/Desgin/LegoHead';
import AirPlane from './Airplane/Airplane';
import Schedule from './Schedule/Schedule';
import PackageForm from './DiyForm/DiyForm';
import { useSelector, useDispatch } from 'react-redux';
import apiClient from '../../api/apiClient';
import {
  selectRoute,
  selectDetailCourses,
  updateAirline,
  updateRoute,
  updateDetailCourses,
  updatePackageForm,
  resetForm,
} from '../../_slices/diySlice';
import { checkAllCoursesNotEmpty } from './Schedule/scheduleUtil';

const DiyEdit = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const detailCourses = useSelector(selectDetailCourses);
  const isAllSelected = checkAllCoursesNotEmpty(detailCourses);
  const endpoint = `/packages/${id}`;

  const fetchData = async (endpoint) => {
    try {
      const response = await apiClient.get(endpoint);
      if (!response.data.isWriter) {
        return;
      }
      const { airline, detailCourses, packageForm } = response.data;
      const route = {
        startDate: response.data.route.startDate,
        endDate: response.data.route.lastDate,
      };
      dispatch(resetForm());
      dispatch(updateAirline(airline));
      dispatch(updateRoute(route));
      detailCourses.forEach((course, index) => {
        dispatch(
          updateDetailCourses({
            dayNum: course.dayNum,
            courses: course.courses,
            fileUrls: course.fileUrls,
          })
        );
      });
      dispatch(updatePackageForm(packageForm));
    } catch (err) {
      setError(err); // Set error state
      console.error('데이터 받아오는 중 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(endpoint);
  }, [endpoint]);
  const step = searchParams.get('step');
  const route = useSelector(selectRoute);

  // 로딩 중일 때
  if (loading) {
    return <div>Loading...</div>;
  }

  // 에러 발생 시
  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }
  return (
    <div className={`${styles.DiyCreate} layout`}>
      <div>
        <h3>
          <span>D </span>
          <span>I </span>
          <span>Y </span>
          레고 수정하기
        </h3>
        <ul className={styles.diy_create_steps}>
          <div className={styles.lego_box}>
            <LegoHead step={step === 'airplane'} />
            <li className={step === 'airplane' ? styles.active : ''}>
              <Link to={`/diy-edit/${id}?step=airplane`}>항공편</Link>
            </li>
          </div>
          <div className={styles.lego_box}>
            <LegoHead step={step === 'schedule'} />
            <li className={step === 'schedule' ? styles.active : ''}>
              {route.startDate && (
                <Link to={`/diy-edit/${id}?step=schedule`}>일정</Link>
              )}
            </li>
          </div>
          <div className={styles.lego_box}>
            <LegoHead step={step === 'diy-form'} />
            <li className={step === 'diy-form' ? styles.active : ''}>
              {isAllSelected ? (
                <Link to={`/diy-edit/${id}?step=diy-form`}>만들기</Link>
              ) : (
                <span>만들기</span>
              )}
            </li>
          </div>
        </ul>
      </div>

      {step === 'airplane' && <AirPlane />}
      {step === 'schedule' && <Schedule />}
      {step === 'diy-form' && <PackageForm />}
    </div>
  );
};

export default DiyEdit;
