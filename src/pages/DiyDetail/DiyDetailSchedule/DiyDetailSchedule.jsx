import { useState } from 'react';
import styles from '../DiyDetail.module.css';
import PlaceIcon from '@mui/icons-material/Place';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CourseList from '../../../components/Diy/DiySchedule';

const DiyDetailSchedule = ({ schedule }) => {
  // 상태 객체를 사용하여 각 detailCourseNum별 이미지 보이기 상태를 관리
  const [openImgStates, setOpenImgStates] = useState({});

  // 해당 detailCourseNum의 이미지 보이기 상태를 토글
  const handleOpenImg = (detailCourseNum) => {
    setOpenImgStates((prevState) => ({
      ...prevState,
      [detailCourseNum]: !prevState[detailCourseNum], // 현재 상태를 반대로 변경
    }));
  };

  return (
    <div>
      <h3>여행 일정</h3>
      <CourseList detaileCourses={schedule} />
    </div>
  );
};

export default DiyDetailSchedule;
