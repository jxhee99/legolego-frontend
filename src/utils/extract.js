export const extractHangul = (text) => {
  const hangulOnly = text.match(/[가-힣]+/g);
  return hangulOnly ? hangulOnly.join(' ') : '';
};
