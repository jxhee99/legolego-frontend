import PropTypes from 'prop-types';
import styles from '../PackageDetail.module.css';
import noneWhite from '../../../assets/images/none-white.png';

const ScheduleInformation = ({ detailCourse }) => {
  return (
    <section className={styles.Schedule}>
      <h3>여행 일정</h3>
      <div>
        <div>
          {detailCourse &&
            detailCourse.map((course, idx) => (
              <div key={course.detailCourseNum} className={styles.CourseList}>
                <h4>
                  {idx + 1}일차 ({course.dayNum})
                </h4>
                <ul className={styles.course_cards}>
                  {course.courses.map((item, index) => (
                    <div
                      key={`${course.detailCourseNum}-${index}`}
                      className={styles.course_card}
                    >
                      <p>
                        {index + 1}. {item}
                      </p>
                      <li>
                        <div>
                          <img
                            src={course.fileUrls[index] || noneWhite}
                            alt="이미지"
                          />
                        </div>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            ))}
        </div>
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
