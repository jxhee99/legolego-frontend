// 시작 날짜와 종료 날짜 사이의 날짜 배열을 생성하는 함수
export const createDateRange = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dateArray = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate).toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
};


// 날짜 범위에 따라 세부 코스 정보를 매핑하는 함수
export const createDetailedCourses = (routeRange, detailCourses) => {
  return routeRange.map((date) => {
    const detail = detailCourses.find((course) => course.dayNum === date);
    return {
      date,
      courses: detail?.courses || [],
      fileUrls: detail?.fileUrls || [],
    };
  });
};


export const checkAllCoursesNotEmpty = (detailCourses) => {
  // detailCourses 배열을 순회
  for (let i = 0; i < detailCourses.length; i++) {
    // 각 객체의 'courses' 속성이 빈 배열인지 검사
    if (detailCourses[i].courses.length === 0) {
      return false; // 하나라도 빈 배열이면 false를 반환.
    }
  }
  return true; // 모든 객체의 'courses'가 비어 있지 않으면 true를 반환
};
