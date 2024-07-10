// 필터링 함수
export const filterItems = (items, filterData) => {
  return items.filter((item) =>
    filterData.some((filterItem) => filterItem.packageNum === item.packageNum)
  );
};

// 정렬 함수
export const sortByPopularity = (items) => {
  return items.slice().sort((a, b) => b.packageLikedNum - a.packageLikedNum);
};
