import PropTypes from 'prop-types';
import styles from '../PreTripDetail.module.css';

const ScheduleInformation = ({ detailCourse }) => {
  return (
    <section className={styles.Schedule}>
      <h3>여행 일정</h3>
      <div>
        {detailCourse &&
          detailCourse.map((course) => (
            <div key={course.detailCourseNum}>
              <h4>{course.dayNum}</h4>
              <ul className={styles.CourseList}>
                {course.courses.map((item, index) => (
                  <li key={`${course.detailCourseNum}-${index}`}>
                    <div>
                      <span>{item}</span>
                      <img src={course.fileUrls[index]} alt="이미지" />
                    </div>
                  </li>
                ))}
              </ul>
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
  ).isRequired,
};

export default ScheduleInformation;
