import CourseList from '../../../components/Diy/DiySchedule';

const DiyDetailSchedule = ({ schedule }) => {
  return (
    <div>
      <h3>🧭 여행 일정</h3>
      <CourseList detaileCourses={schedule} />
    </div>
  );
};

export default DiyDetailSchedule;
