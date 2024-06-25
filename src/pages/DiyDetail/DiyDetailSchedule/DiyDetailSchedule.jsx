import { useState } from 'react';
import styles from '../DiyDetail.module.css';

const DiyDetailSchedule = ({ schedule }) => {
  const [openImgStates, setOpenImgStates] = useState({});

  const handleOpenImg = (detailCourseNum) => {
    setOpenImgStates((prevState) => ({
      ...prevState,
      [detailCourseNum]: !prevState[detailCourseNum],
    }));
  };

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
                  {item.courses.map((course, index) => (
                    <div key={index}>{`${index + 1} : ${course}`}</div>
                  ))}
                  <img
                    src={'/src/assets/images/arrow_to_bottom.png'}
                    onClick={() => handleOpenImg(item.detailCourseNum)}
                  ></img>
                </div>
              </div>
              {openImgStates[item.detailCourseNum] && (
                <div className={styles.imgs_detail}>
                  <div className={styles.imgs_box}>
                    {item.fileUrls.map((url, index) => (
                      <div key={index}>
                        <img src={url} alt={`Image ${index}`} />
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
