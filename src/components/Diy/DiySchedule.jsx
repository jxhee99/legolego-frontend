import React from 'react';
import styles from './DiySchedule.module.css';

const CourseList = ({ detaileCourses }) => {
  return (
    <ul style={{ width: '100%' }}>
      {detaileCourses.map((detail, index) => (
        <li key={index} className={styles.course_box}>
          <div className={styles.date_and_button}>
            <span>{detail.dayNum}</span>
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
  );
};

export default CourseList;
