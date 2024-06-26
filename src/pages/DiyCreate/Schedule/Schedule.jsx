import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Schedule.module.css';
import {
  selectRoute,
  selectDetailCourses,
  resetDetailCoursesForDate,
} from '../../../_slices/diySlice';
import CourseModal from './CourseModal/CourseModal';

const createDateRange = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dateArray = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate).toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
};

const createDetailedCourses = (routeRange, detailCourses) => {
  return routeRange.map((date) => {
    const detail = detailCourses.find((course) => course.dayNum === date);
    return {
      date,
      courses: detail?.courses || [],
      fileUrls: detail?.fileUrls || [],
    };
  });
};

const Schedule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const route = useSelector(selectRoute);
  const detailCourses = useSelector(selectDetailCourses);

  const routeRange =
    route.startDate && route.lastDate
      ? createDateRange(route.startDate, route.lastDate)
      : [];
  console.log(routeRange);

  const newDetaileCourses = createDetailedCourses(routeRange, detailCourses);
  console.log(newDetaileCourses);

  const [modalVisibilities, setModalVisibilities] = useState(
    new Array(routeRange.length).fill(false)
  );

  useEffect(() => {
    console.log('Initial detailCourses state:', detailCourses);
  }, [detailCourses]);

  const handleAddPlace = (detailIndex) => {
    const updatedVisibilities = [...modalVisibilities];
    updatedVisibilities[detailIndex] = true;
    setModalVisibilities(updatedVisibilities);
  };

  const closeModal = (detailIndex) => {
    const updatedVisibilities = [...modalVisibilities];
    updatedVisibilities[detailIndex] = false;
    setModalVisibilities(updatedVisibilities);
  };

  const handleResetCourses = (date) => {
    dispatch(resetDetailCoursesForDate(date));
  };

  const handleMove = () => {
    navigate('/diy-create?step=diy-form');
  };

  if (!route || !route.startDate || !route.lastDate) {
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
                    {detail.fileUrls[i] && (
                      <img src={detail.fileUrls[i]} alt="코스 이미지" />
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
      <button onClick={handleMove}>레고 만들기</button>
    </div>
  );
};

export default Schedule;
