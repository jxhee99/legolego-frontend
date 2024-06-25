import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Schedule.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectRoute,
  selectDetailCourses,
  updateCourseNames,
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
  return routeRange.map((date) => ({
    date: date,
    courses:
      detailCourses.find((course) => course.dayNum === date)?.courses || [],
    fileUrls:
      detailCourses.find((course) => course.dayNum === date)?.fileUrls || [],
  }));
};

const Schedule = () => {
  const navigate = useNavigate();
  const route = useSelector(selectRoute);
  const detailCourses = useSelector(selectDetailCourses);

  const routeRange =
    route.startDate && route.lastDate
      ? createDateRange(route.startDate, route.lastDate)
      : [];
  console.log(routeRange);
  // Create detailed courses based on date range
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

  const handleMove = () => {
    //TODO 코스 갯수 유효성 검사 추후 추가
    navigate('/diy-create?step=diy-form');
  };

  return (
    <div className={styles.Schedule}>
      <h3>관광지와 맛집을 검색하여 일정을 추가해보세요!</h3>
      <ul>
        {newDetaileCourses.map((detail, index) => (
          <li key={index} className={styles.course_box}>
            <div className={styles.date_and_button}>
              <span>{detail.date}</span>
              <button onClick={() => handleAddPlace(index)}>장소추가</button>
            </div>
            <ul className={styles.courses}>
              {detail.courses.map((course, index) => (
                <li key={`course-${index}`}>
                  <div>{`${index + 1} : ${course}`}</div>
                </li>
              ))}
            </ul>
            <ul className={styles.images}>
              {detail.fileUrls.map((url, index) => (
                <li key={`course-${index}`}>
                  <img src={url} alt="코스 이미지"></img>
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
