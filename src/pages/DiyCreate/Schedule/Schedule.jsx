import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Schedule.module.css';
import {
  selectAirline,
  selectRoute,
  selectDetailCourses,
  resetDetailCoursesForDate,
} from '../../../_slices/diySlice';
import {
  createDateRange,
  createDetailedCourses,
  checkAllCoursesNotEmpty,
} from './scheduleUtil';
import CourseModal from './CourseModal/CourseModal';
import PlaceIcon from '@mui/icons-material/Place';

const Schedule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const airline = useSelector(selectAirline);
  const route = useSelector(selectRoute);
  const detailCourses = useSelector(selectDetailCourses);

  // route의 시작 날짜와 종료 날짜로 날짜 범위 생성
  const routeRange =
    route.startDate && route.lastDate
      ? createDateRange(route.startDate, route.lastDate)
      : [];
  console.log(routeRange);

  // 날짜 범위에 따라 세부 코스 정보 생성
  const newDetaileCourses = createDetailedCourses(routeRange, detailCourses);
  console.log(newDetaileCourses);

  // 모달의 가시성 상태를 관리하는 state
  const [modalVisibilities, setModalVisibilities] = useState(
    new Array(routeRange.length).fill(false)
  );

  // detailCourses가 변경될 때마다 실행
  useEffect(() => {
    console.log('Initial detailCourses state:', detailCourses);
  }, [detailCourses]);

  // 장소 추가 버튼 클릭 핸들러
  const handleAddPlace = (detailIndex) => {
    const updatedVisibilities = [...modalVisibilities];
    updatedVisibilities[detailIndex] = true;
    setModalVisibilities(updatedVisibilities);
  };

  // 모달 닫기 핸들러
  const closeModal = (detailIndex) => {
    const updatedVisibilities = [...modalVisibilities];
    updatedVisibilities[detailIndex] = false;
    setModalVisibilities(updatedVisibilities);
  };

  // 코스 초기화 버튼 클릭 핸들러
  const handleResetCourses = (date) => {
    dispatch(resetDetailCoursesForDate(date));
  };

  // DIY 만들기 페이지로 이동하는 핸들러
  const handleMove = () => {
    navigate('/diy-create?step=diy-form');
  };

  // route 정보가 없을 때 안내 메시지 표시
  if (
    !route ||
    !route.startDate ||
    !route.lastDate ||
    !airline.comeAirlineName
  ) {
    return <div>항공편을 먼저 선택해주세요</div>;
  }

  return (
    <div className={styles.Schedule}>
      <h3>관광지와 맛집을 검색하여 일정을 추가해보세요!</h3>
      <ul>
        {newDetaileCourses.map((detail, index) => (
          <li key={index} className={styles.course_box}>
            <div className={styles.date_and_button}>
              <span>{detail.date}</span>
              <div className={styles.add_reset_button}>
                <button onClick={() => handleAddPlace(index)}>장소추가</button>
                <button onClick={() => handleResetCourses(detail.date)}>
                  reset
                </button>
              </div>
            </div>
            <ul className={styles.courses}>
              {detail.courses.map((course, i) => (
                <li key={`course-${i}`}>
                  <div className={styles.detail}>
                    <div>{`course ${i + 1}`}</div>
                    {detail.fileUrls[i] ? (
                      <img src={detail.fileUrls[i]} alt="코스 이미지" />
                    ) : (
                      <PlaceIcon sx={{ m: 2 }} />
                    )}
                    <div>{course}</div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {routeRange.map((date, index) => (
        <CourseModal
          key={`modal-${index}`}
          isVisible={modalVisibilities[index]}
          closeModal={() => closeModal(index)}
          date={date}
        />
      ))}
      {checkAllCoursesNotEmpty(detailCourses) &&
        detailCourses.length === routeRange.length && (
          <button onClick={handleMove}>레고 만들기</button>
        )}
    </div>
  );
};

export default Schedule;
