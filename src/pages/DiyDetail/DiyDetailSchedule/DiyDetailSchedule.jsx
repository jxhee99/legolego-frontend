import { useState } from 'react';
import styles from '../DiyDetail.module.css';

const DiyDetailSchedule = ({ schedule }) => {
  const fileUrls = [
    'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXX9w7_DDn_PD4ghoeaCXyKzofWukPqBdiCjPbaBCRFvFZmvWUmI1NylMrwjMrkvYSHT5QXZKGyOozbkfNvMU3ApOhyDXMIaW8z0i4yeRhCswr9EYDesnBFGxq70hYc5KUils9AHMnIxRttxiXmyfc3WzYJTlphBF8_0tUmoWv1LdAaK&3u400&4u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173&key=AIzaSyAblAMlRJOooJk9NNyvDtHhL8fpd9vtgck&token=39681',
    'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXX9w7_DDn_PD4ghoeaCXyKzofWukPqBdiCjPbaBCRFvFZmvWUmI1NylMrwjMrkvYSHT5QXZKGyOozbkfNvMU3ApOhyDXMIaW8z0i4yeRhCswr9EYDesnBFGxq70hYc5KUils9AHMnIxRttxiXmyfc3WzYJTlphBF8_0tUmoWv1LdAaK&3u400&4u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173&key=AIzaSyAblAMlRJOooJk9NNyvDtHhL8fpd9vtgck&token=39681',
    'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXX9w7_DDn_PD4ghoeaCXyKzofWukPqBdiCjPbaBCRFvFZmvWUmI1NylMrwjMrkvYSHT5QXZKGyOozbkfNvMU3ApOhyDXMIaW8z0i4yeRhCswr9EYDesnBFGxq70hYc5KUils9AHMnIxRttxiXmyfc3WzYJTlphBF8_0tUmoWv1LdAaK&3u400&4u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173&key=AIzaSyAblAMlRJOooJk9NNyvDtHhL8fpd9vtgck&token=39681',
    'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXX9w7_DDn_PD4ghoeaCXyKzofWukPqBdiCjPbaBCRFvFZmvWUmI1NylMrwjMrkvYSHT5QXZKGyOozbkfNvMU3ApOhyDXMIaW8z0i4yeRhCswr9EYDesnBFGxq70hYc5KUils9AHMnIxRttxiXmyfc3WzYJTlphBF8_0tUmoWv1LdAaK&3u400&4u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173&key=AIzaSyAblAMlRJOooJk9NNyvDtHhL8fpd9vtgck&token=39681',
    'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXX9w7_DDn_PD4ghoeaCXyKzofWukPqBdiCjPbaBCRFvFZmvWUmI1NylMrwjMrkvYSHT5QXZKGyOozbkfNvMU3ApOhyDXMIaW8z0i4yeRhCswr9EYDesnBFGxq70hYc5KUils9AHMnIxRttxiXmyfc3WzYJTlphBF8_0tUmoWv1LdAaK&3u400&4u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173&key=AIzaSyAblAMlRJOooJk9NNyvDtHhL8fpd9vtgck&token=39681',
    'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXX9w7_DDn_PD4ghoeaCXyKzofWukPqBdiCjPbaBCRFvFZmvWUmI1NylMrwjMrkvYSHT5QXZKGyOozbkfNvMU3ApOhyDXMIaW8z0i4yeRhCswr9EYDesnBFGxq70hYc5KUils9AHMnIxRttxiXmyfc3WzYJTlphBF8_0tUmoWv1LdAaK&3u400&4u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173&key=AIzaSyAblAMlRJOooJk9NNyvDtHhL8fpd9vtgck&token=39681',
    'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXX9w7_DDn_PD4ghoeaCXyKzofWukPqBdiCjPbaBCRFvFZmvWUmI1NylMrwjMrkvYSHT5QXZKGyOozbkfNvMU3ApOhyDXMIaW8z0i4yeRhCswr9EYDesnBFGxq70hYc5KUils9AHMnIxRttxiXmyfc3WzYJTlphBF8_0tUmoWv1LdAaK&3u400&4u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173&key=AIzaSyAblAMlRJOooJk9NNyvDtHhL8fpd9vtgck&token=39681',
    'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXX9w7_DDn_PD4ghoeaCXyKzofWukPqBdiCjPbaBCRFvFZmvWUmI1NylMrwjMrkvYSHT5QXZKGyOozbkfNvMU3ApOhyDXMIaW8z0i4yeRhCswr9EYDesnBFGxq70hYc5KUils9AHMnIxRttxiXmyfc3WzYJTlphBF8_0tUmoWv1LdAaK&3u400&4u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173&key=AIzaSyAblAMlRJOooJk9NNyvDtHhL8fpd9vtgck&token=39681',
  ];
  const [openImg, setOpenImg] = useState(true);

  const handleOpenImg = () => {};
  return (
    <>
      <h3>여행 일정</h3>
      <div className={styles.schedule_box}>
        {schedule &&
          schedule.map((item) => (
            <div key={item.detailCourseNum}>
              <div className={styles.day_course_box}>
                <div className={styles.day_box}>
                  <span>{item.dayNum}</span>
                </div>
                <div className={styles.course_box}>
                  {item.courses.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                  <img
                    src={'/src/assets/images/arrow_to_bottom.png'}
                    onClick={handleOpenImg}
                  ></img>
                </div>
              </div>
              {openImg && (
                <div style={{ width: '80%' }}>
                  <div className={styles.imgs_box}>
                    {fileUrls.map((item, index) => (
                      <div key={index}>
                        <img src={item} alt={`Image ${index}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default DiyDetailSchedule;
