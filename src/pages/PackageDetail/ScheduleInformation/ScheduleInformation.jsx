import PropTypes from 'prop-types';
import styles from '../PackageDetail.module.css';
import noneWhite from '../../../assets/images/none-white.png';

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
                      <div className={styles.course_top}>
                        <span className={styles.days}>{index + 1} .</span>
                        <span>{item}</span>
                      </div>
                      <img
                        src={course.fileUrls[index] || noneWhite}
                        alt="이미지"
                      />
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
  ),
};

export default ScheduleInformation;
