import { useState, useEffect } from 'react';
import styles from './Schedule.module.css';
import { useSelector } from 'react-redux';
import { selectDetailCourses } from '../../../_slices/diySlice';
import CourseModal from './CourseModal/CourseModal';

const Schedule = () => {
  const detailCourses = useSelector(selectDetailCourses);
  const [modalVisibilities, setModalVisibilities] = useState(
    new Array(detailCourses.length).fill(false)
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
        {detailCourses.map((detail, index) => (
          <li key={`detail-${index}`}>
            <div>
              <span>{detail.dayNum}</span>
              <button onClick={() => handleAddPlace(index)}>장소추가</button>
            </div>
            <div>
              추가된 장소:
              {detail.courses.map((course, idx) => (
                <p key={idx}>{course}</p>
              ))}
            </div>
          </li>
        ))}
      </ul>
      {detailCourses.map((detail, index) => (
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
