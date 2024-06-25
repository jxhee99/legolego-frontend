import PropTypes from 'prop-types';
import styles from '../PackageDetail.module.css';

const ScheduleInformation = ({ detailCourse }) => {
  return (
    <section className={styles.Schedule}>
      <h3>여행 일정</h3>
      <div>
        {detailCourse &&
          detailCourse.map((course) => (
            <div key={course.detailCourseNum}>
              <h4>{course.dayNum}</h4>
              <ul>
                {course.courses.map((item, index) => (
                  <li key={index}>{item}</li>
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
    })
  ),
};

export default ScheduleInformation;
