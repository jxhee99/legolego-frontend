import PropTypes from 'prop-types';
import styles from '../PackageDetail.module.css';

const ScheduleInformation = ({ detailCourse }) => {
  return (
    <section className={styles.Schedule}>
      <h3>여행 일정</h3>
      <div>
        <h4>1일차</h4>
        <div className={styles.dailySchedule}>
          <div className={styles.dailyCourse}>
            <div>
              <img src="https://i.namu.wiki/i/wcAdgxQ5BUjjB57p8jNmp4ZWC0qw2nEa-ogMvz5wjpBGkAsKdHG2s7Z-qgIv_eb2XOF267PtlqV31Dv1y3-4745K2XssJmIiVrbJjIHvHkxwHaLiPZkGAYsvel-S1FoRRXEsWJDZwBJ-MvGoJMyKpQ.webp" />
            </div>
            <div className={styles.dailyDetail}>
              <h4>관광지명</h4>
              <h5>여행지 설명 필요한지 확인</h5>
            </div>
          </div>

          <div className={styles.dailyCourse}>
            <div>
              <img src="https://i.namu.wiki/i/wcAdgxQ5BUjjB57p8jNmp4ZWC0qw2nEa-ogMvz5wjpBGkAsKdHG2s7Z-qgIv_eb2XOF267PtlqV31Dv1y3-4745K2XssJmIiVrbJjIHvHkxwHaLiPZkGAYsvel-S1FoRRXEsWJDZwBJ-MvGoJMyKpQ.webp" />
            </div>
            <div className={styles.dailyDetail}>
              <h4>관광지명</h4>
              <h5>여행지 설명 필요한지 확인</h5>
            </div>
          </div>

          <div className={styles.dailyCourse}>
            <div>
              <img src="https://i.namu.wiki/i/wcAdgxQ5BUjjB57p8jNmp4ZWC0qw2nEa-ogMvz5wjpBGkAsKdHG2s7Z-qgIv_eb2XOF267PtlqV31Dv1y3-4745K2XssJmIiVrbJjIHvHkxwHaLiPZkGAYsvel-S1FoRRXEsWJDZwBJ-MvGoJMyKpQ.webp" />
            </div>
            <div className={styles.dailyDetail}>
              <h4>관광지명</h4>
              <h5>여행지 설명 필요한지 확인</h5>
            </div>
          </div>
        </div>

        <h4>2일차</h4>

        <div className={styles.dailySchedule}>
          <div className={styles.dailyCourse}>
            <div>
              <img src="https://i.namu.wiki/i/wcAdgxQ5BUjjB57p8jNmp4ZWC0qw2nEa-ogMvz5wjpBGkAsKdHG2s7Z-qgIv_eb2XOF267PtlqV31Dv1y3-4745K2XssJmIiVrbJjIHvHkxwHaLiPZkGAYsvel-S1FoRRXEsWJDZwBJ-MvGoJMyKpQ.webp" />
            </div>
            <div className={styles.dailyDetail}>
              <h4>관광지명</h4>
              <h5>여행지 설명 필요한지 확인</h5>
            </div>
          </div>

          <div className={styles.dailyCourse}>
            <div>
              <img src="https://i.namu.wiki/i/wcAdgxQ5BUjjB57p8jNmp4ZWC0qw2nEa-ogMvz5wjpBGkAsKdHG2s7Z-qgIv_eb2XOF267PtlqV31Dv1y3-4745K2XssJmIiVrbJjIHvHkxwHaLiPZkGAYsvel-S1FoRRXEsWJDZwBJ-MvGoJMyKpQ.webp" />
            </div>
            <div className={styles.dailyDetail}>
              <h4>관광지명</h4>
              <h5>여행지 설명 필요한지 확인</h5>
            </div>
          </div>

          <div className={styles.dailyCourse}>
            <div>
              <img src="https://i.namu.wiki/i/wcAdgxQ5BUjjB57p8jNmp4ZWC0qw2nEa-ogMvz5wjpBGkAsKdHG2s7Z-qgIv_eb2XOF267PtlqV31Dv1y3-4745K2XssJmIiVrbJjIHvHkxwHaLiPZkGAYsvel-S1FoRRXEsWJDZwBJ-MvGoJMyKpQ.webp" />
            </div>
            <div className={styles.dailyDetail}>
              <h4>관광지명</h4>
              <h5>여행지 설명 필요한지 확인</h5>
            </div>
          </div>
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
    })
  ),
};

export default ScheduleInformation;
