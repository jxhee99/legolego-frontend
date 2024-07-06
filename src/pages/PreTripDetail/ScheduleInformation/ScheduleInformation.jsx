import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ScheduleInformation.module.css';
import noneWhite from '../../../assets/images/none-white.png';

const ScheduleInformation = ({ detailCourse }) => {
  const [currentSlide, setCurrentSlide] = useState({});
  const [itemsPerSlide] = useState(3);

  useEffect(() => {
    if (detailCourse && detailCourse.length > 0) {
      const initialSlideState = {};
      detailCourse.forEach((course) => {
        initialSlideState[course.detailCourseNum] = 0;
      });
      setCurrentSlide(initialSlideState);
    }
  }, [detailCourse]);

  const handlePrevSlide = (courseNum, totalItems) => {
    setCurrentSlide((prev) => ({
      ...prev,
      [courseNum]: Math.max(prev[courseNum] - itemsPerSlide, 0),
    }));
  };

  const handleNextSlide = (courseNum, totalItems) => {
    setCurrentSlide((prev) => ({
      ...prev,
      [courseNum]: Math.min(
        prev[courseNum] + itemsPerSlide,
        totalItems - itemsPerSlide
      ),
    }));
  };

  if (!detailCourse || detailCourse.length === 0) {
    return <div>일정 정보가 없습니다.</div>;
  }

  return (
    <section className={styles.Schedule}>
      <h3>여행 일정</h3>
      <div>
        {detailCourse.map((course, idx) => (
          <div key={course.detailCourseNum} className={styles.CourseList}>
            <div className={styles.courseHeader}>
              <h4>
                {idx + 1}일차 ({course.dayNum})
              </h4>
              <div className={styles.sliderControls}>
                <button
                  onClick={() =>
                    handlePrevSlide(
                      course.detailCourseNum,
                      course.courses.length
                    )
                  }
                  disabled={currentSlide[course.detailCourseNum] === 0}
                >
                  이전
                </button>
                <button
                  onClick={() =>
                    handleNextSlide(
                      course.detailCourseNum,
                      course.courses.length
                    )
                  }
                  disabled={
                    currentSlide[course.detailCourseNum] >=
                    course.courses.length - itemsPerSlide
                  }
                >
                  다음
                </button>
              </div>
            </div>
            <div className={styles.scrollWrapper}>
              <ul className={styles.course_cards}>
                {course.courses.map((item, index) => (
                  <li
                    key={`${course.detailCourseNum}-${index}`}
                    style={{
                      transform: `translateX(-${currentSlide[course.detailCourseNum] * (100 / itemsPerSlide)}%)`,
                      transition: 'transform 0.5s ease',
                    }}
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
