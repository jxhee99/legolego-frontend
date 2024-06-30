import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationComp = ({
  page,
  setPage,
  totalItems,
  itemsPerPage,
  filterApplied,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 페이지 변경 시 URL 업데이트
  useEffect(() => {
    console.log('페이지변경 및 url 업데이트');
    const newQuery = new URLSearchParams(location.search);
    newQuery.set('page', page);
    if (filterApplied != undefined) {
      newQuery.set('filter', filterApplied);
    }
    navigate({ search: newQuery.toString() }, { replace: true });
  }, [page, filterApplied, navigate, location.search]);

  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(totalItems / itemsPerPage)}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    </Stack>
  );
};

export default PaginationComp;
