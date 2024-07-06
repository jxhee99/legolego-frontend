import React from 'react';
import styles from './DiySchedule.module.css';
import PlaceIcon from '@mui/icons-material/Place';

const CourseList = ({ detaileCourses }) => {
  return (
    <ul className={styles.container}>
      {detaileCourses.map((detail, index) => (
        <li key={index} className={styles.course_box}>
          <div className={styles.date_box}>
            <h4 className={styles.day_num}>{detail.dayNum}</h4>
            <p>{index + 1}일 차</p>
          </div>
          <ul className={styles.courses}>
            {detail.courses.map((course, i) => (
              <React.Fragment key={`course-fragment-${i}`}>
                <li key={`course-${i}`}>
                  <div className={styles.detail}>
                    <p>{`코스 ${i + 1}`}</p>
                    {detail.fileUrls[i] ? (
                      <img src={detail.fileUrls[i]} alt="코스 이미지" />
                    ) : (
                      <PlaceIcon sx={{ m: 2 }} />
                    )}
                    <p data-full-text={course}>{course}</p>
                  </div>
                </li>
                {i < detail.courses.length - 1 && (
                  <svg key={`line-${i}`} className={styles.line}>
                    <line x1="0" y1="149" x2="200" y2="149" />
                  </svg>
                )}
              </React.Fragment>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default CourseList;
