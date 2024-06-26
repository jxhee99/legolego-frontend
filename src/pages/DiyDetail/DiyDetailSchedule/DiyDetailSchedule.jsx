import { useState } from 'react';
import styles from '../DiyDetail.module.css';

const DiyDetailSchedule = ({ schedule }) => {
  // 상태 객체를 사용하여 각 detailCourseNum별 이미지 보이기 상태를 관리
  const [openImgStates, setOpenImgStates] = useState({});

  //해당 detailCourseNum의 이미지 보이기 상태를 토글
  const handleOpenImg = (detailCourseNum) => {
    setOpenImgStates((prevState) => ({
      ...prevState,
      [detailCourseNum]: !prevState[detailCourseNum], // 현재 상태를 반대로 변경
    }));
  };

  return (
    <>
      <h3>여행 일정</h3>
      <div className={styles.schedule_box}>
        {schedule &&
          schedule.map((item) => {
            // courses와 fileUrls 배열을 병합하여 새로운 배열 생성
            const courseDetails = item.courses.map((course, index) => ({
              course,
              fileUrl: item.fileUrls[index],
            }));

            return (
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
                      onClick={() => handleOpenImg(item.detailCourseNum)} // 이미지 클릭 시 상태 변경 함수 호출
                      alt="Toggle"
                    />
                  </div>
                </div>
                {/* openImgStates 상태가 true일 때만 courseDetails를 렌더링 */}
                {openImgStates[item.detailCourseNum] && (
                  <div className={styles.imgs_box}>
                    {courseDetails.map((detail, index) => (
                      <div key={index} className={styles.img_desc}>
                        <img src={detail.fileUrl} alt={`Image ${index}`} />
                        <div>{`${detail.course}`}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default DiyDetailSchedule;
