export const extractHangul = (text) => {
  const hangulOnly = text.match(/[가-힣]+/g);
  return hangulOnly ? hangulOnly.join(' ') : '';
};

// 숫자를 두 자리로 패딩하는 함수
function padNumber(num) {
  return num.toString().padStart(2, '0');
}

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  const formattedDate = `${date.getFullYear()}${padNumber(date.getMonth() + 1)}${padNumber(date.getDate())}`;

  return formattedDate;
};

export const getRandomElement = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];
