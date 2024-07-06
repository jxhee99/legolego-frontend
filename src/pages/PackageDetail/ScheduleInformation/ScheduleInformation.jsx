import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ScheduleInformation.module.css';
import noneWhite from '../../../assets/images/none-white.png';

const ScheduleInformation = ({ detailCourse }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % detailCourse.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (currentSlide - 1 + detailCourse.length) % detailCourse.length
    );
  };

  return (
    <section className={styles.Schedule}>
      <h3>여행 일정</h3>
      <div>
        {detailCourse &&
          detailCourse.map((course, idx) => (
            <div key={course.detailCourseNum} className={styles.CourseList}>
              <h4>
                {idx + 1}일차 ({course.dayNum})
              </h4>
              <div className={styles.scrollWrapper}>
                <ul
                  className={`${styles.course_cards} ${styles.horizontalScroll}`}
                >
                  {course.courses.map((item, index) => (
                    <li
                      key={`${course.detailCourseNum}-${index}`}
                      className={index === currentSlide ? styles.active : ''}
                    >
                      <div>
                        <p className={styles.course}>
                          <span>{index + 1}</span>
                          <span>{item}</span>
                        </p>
                        <img
                          src={course.fileUrls[index] || noneWhite}
                          alt="이미지"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
      <button onClick={prevSlide}>이전</button>
      <button onClick={nextSlide}>다음</button>
    </section>
  );
};

ScheduleInformation.propTypes = {
  detailCourse: PropTypes.arrayOf(
    PropTypes.shape({
      detailCourseNum: PropTypes.number.isRequired,
      dayNum: PropTypes.string.isRequired,
      courses: PropTypes.arrayOf(PropTypes.string).isRequired,
      fileUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
};

export default ScheduleInformation;
