import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../../../components/List/List.module.css';
import ListTable from '../../../components/List/ListTable';
import PaginationComp from '../../../components/Pagination/PaginationComp';
import ToggleFilter from '../../../components/ToggleFilter/ToggleFilter';
import useFetchData from '../../../hooks/useFetchDiyData';

const MembersList = () => {
  const location = useLocation();

  // 초기 상태와 변수 설정
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const initialFilter = query.get('filter') || '';
  const itemsPerPage = 10;
  const endpoint = '/api/admin/members';

  // 상태 관리
  const [filter, setFilter] = useState(initialFilter);
  const [page, setPage] = useState(initialPage);

  const { data, loading, error, refetch } = useFetchData(endpoint);

  // 로딩 중일 때
  if (loading) {
    return <div>Loading...</div>;
  }

  // 에러 발생 시
  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }
  // 데이터가 없을 때
  if (!data || data.length === 0) {
    return <div>데이터가 없습니다.</div>;
  }

  // 필터된 데이터 설정
  let filteredData = [...data];
  if (filter === 'user') {
    filteredData = data.filter((item) => item.companyName === null);
  } else if (filter === 'partner') {
    filteredData = data.filter((item) => item.name === null);
  }

  // 현재 페이지에 맞는 데이터 계산
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // 필터 설정
  const handleChange = (event, newFilter) => {
    if (newFilter === filter) {
      setFilter('');
      setPage(1);
    } else {
      setFilter(newFilter);
      setPage(1);
    }
  };
  //필터 토글 버튼
  const toggleButtons = [
    { value: 'user', label: 'User' },
    { value: 'partner', label: 'Partner' },
  ];

  return (
    <div className={styles.box}>
      <h2>회원목록</h2>
      <div className={styles.filter_box}>
        <ToggleFilter
          filter={filter}
          handleChange={handleChange}
          setFilter={setFilter}
          buttons={toggleButtons}
        />
      </div>
      <ListTable>
        <thead>
          <tr>
            <th style={{ width: '10%' }}>구분</th>
            <th style={{ textAlign: 'center' }}>이름</th>
            <th>닉네임</th>
            <th style={{ width: '30%' }}>이메일</th>
            <th style={{ width: '30%' }}>휴대전화</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.companyName ? '파트너' : '개인'}</td>
              <td style={{ textAlign: 'center' }}>
                {item.name || item.companyName}
              </td>
              <td>{item.nickname}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </ListTable>
      {/* 페이지네이션 */}
      <div className={styles.pagination_box}>
        <PaginationComp
          page={page}
          setPage={setPage}
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          filterApplied={filter}
        />
      </div>
    </div>
  );
};

export default MembersList;
