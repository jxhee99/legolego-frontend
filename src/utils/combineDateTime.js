const combineDateTime = (date, time) => {
  if (!date || !time) return null;
  return `${date}T${time}:00`;
};

export default combineDateTime;