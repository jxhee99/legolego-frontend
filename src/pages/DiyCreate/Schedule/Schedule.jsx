import { useState, useEffect } from 'react';
import styles from './Schedule.module.css';
import { useSelector } from 'react-redux';
import { selectRoute, selectDetailCourses } from '../../../_slices/diySlice';
import CourseModal from './CourseModal/CourseModal';

function createDateRange(startDate, endDate) {
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push({
      dayNum: currentDate.toISOString().split('T')[0],
      courses: [],
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

const Schedule = () => {
  const route = useSelector(selectRoute);
  const detailCourses = useSelector(selectDetailCourses);
  const routeRange =
    route.startDate && route.lastDate
      ? createDateRange(route.startDate, route.lastDate, detailCourses)
      : [];
  const [modalVisibilities, setModalVisibilities] = useState(
    new Array(routeRange.length).fill(false)
  );

  useEffect(() => {
    console.log('Initial detailCourses state:', detailCourses);
  }, []);

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

  return (
    <div className={styles.Schedule}>
      <h3>관광지와 맛집을 검색하여 일정을 추가해보세요!</h3>
      <ul>
        {routeRange.map((detail, index) => (
          <li key={detail.dayNum}>
            <div>
              <span>{detail.dayNum}</span>
              <button onClick={() => handleAddPlace(index)}>장소추가</button>
            </div>
          </li>
        ))}
      </ul>
      {routeRange.map((detail, index) => (
        <CourseModal
          key={`modal-${index}`}
          isVisible={modalVisibilities[index]}
          closeModal={() => closeModal(index)}
          detail={{ ...detail, index: index }}
        />
      ))}
    </div>
  );
};

export default Schedule;
