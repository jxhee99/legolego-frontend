// combineDateTime.js 파일

export const combineDateTime = (date, time) => {
  if (!date || !time) return null;
  return `${date}T${time}:00`;
};

export const formatDateTime = (isoDateTime) => {
  const date = new Date(isoDateTime);

  // 월과 일이 한 자리 수일 경우 앞에 0을 붙이기 위해 함수 정의
  const pad = (num) => num.toString().padStart(2, '0');

  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1); // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());

  // 원하는 형식으로 조합하여 반환
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
};

export const formatTimeString = (timeString) => {
  // HHMM 형식의 문자열을 HH:MM 형식으로 변환
  const hours = timeString.slice(0, 2);
  const minutes = timeString.slice(2, 4);
  return `${hours}:${minutes}`;
};

export const getCurrentTime = () => new Date();