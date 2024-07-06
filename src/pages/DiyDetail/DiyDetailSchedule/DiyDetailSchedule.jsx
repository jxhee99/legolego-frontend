import { useState } from 'react';
import styles from '../DiyDetail.module.css';
import PlaceIcon from '@mui/icons-material/Place';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CourseList from '../../../components/Diy/DiySchedule';

const DiyDetailSchedule = ({ schedule }) => {
  return (
    <div>
      <h3>여행 일정</h3>
      <CourseList detaileCourses={schedule} />
    </div>
  );
};

export default DiyDetailSchedule;
