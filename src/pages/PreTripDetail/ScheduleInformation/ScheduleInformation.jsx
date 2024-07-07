import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ScheduleInformation.module.css';
import noneWhite from '../../../assets/images/none-white.png';

const ScheduleInformation = ({ detailCourse }) => {
  const [hoveredImage, setHoveredImage] = useState(null);

  return (
    <section className={styles.schedule}>
      <h2 className={styles.title}>지난 여행 일정</h2>
      <div className={styles.timeline}>
        {detailCourse &&
          detailCourse.map((course, idx) => (
            <div key={course.detailCourseNum} className={styles.timelineItem}>
              <div className={styles.timelineContent}>
                <h3 className={styles.dayTitle}>
                  {idx + 1}일차 ({course.dayNum})
                </h3>
                <ul className={styles.courseList}>
                  {course.courses.map((item, index) => (
                    <li
                      key={`${course.detailCourseNum}-${index}`}
                      className={styles.courseItem}
                      onMouseEnter={() =>
                        setHoveredImage(course.fileUrls[index] || noneWhite)
                      }
                      onMouseLeave={() => setHoveredImage(null)}
                    >
                      <img
                        src={course.fileUrls[index] || noneWhite}
                        alt={`Day ${idx + 1} - Location ${index + 1}`}
                        className={styles.courseImage}
                      />
                      <div className={styles.courseInfo}>
                        <span className={styles.courseNumber}>{index + 1}</span>
                        <p className={styles.courseName}>{item}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
      {hoveredImage && (
        <div className={styles.imageOverlay}>
          <img
            src={hoveredImage}
            alt="Enlarged view"
            className={styles.enlargedImage}
          />
        </div>
      )}
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
