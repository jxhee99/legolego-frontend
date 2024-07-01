import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PaginationComp from '../../../components/Pagination/PaginationComp';
import ToggleFilter from '../../../components/ToggleFilter/ToggleFilter';
import PartnerOrderDetail from './PartnerOrderDetail';
import ListTable from '../../../components/List/ListTable';
import useFetchData from '../../../hooks/useFetchDiyData';
import { formatDateTime } from '../../../utils/DateTime';

import styles from '../../../components/List/List.module.css';

const PartnerOrders = () => {
  const location = useLocation();

  // 초기 상태와 변수 설정
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const initialFilter = query.get('filter') || '';
  const itemsPerPage = 10;
  const endpoint = '/api/partner/products';

  // 상태 관리
  const [filter, setFilter] = useState(initialFilter);
  const [page, setPage] = useState(initialPage);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 데이터 가져오기 훅
  const { data, loading, error } = useFetchData(endpoint);

  // 로딩 중일 때
  if (loading) {
    return <div>로딩 중...</div>;
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
  const filteredData =
    filter === 'confirm'
      ? data.filter((item) => item.recruitmentConfirmed === true)
      : data;

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
  const toggleButtons = [{ value: 'confirm', label: '여행 확정' }];

  // 주문 내역 상세보기 함수
  const handleViewOrderDetail = (order) => {
    setSelectedOrder(order);
  };

  // 목록으로 돌아가기 함수
  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  return (
    <div className={styles.box}>
      {selectedOrder ? (
        <PartnerOrderDetail orders={selectedOrder} onBack={handleBackToList} />
      ) : (
        <>
          <h2>여행 상품</h2>
          <div className={styles.filter_box}>
            <ToggleFilter
              filter={filter}
              handleChange={handleChange}
              setFilter={setFilter}
              buttons={toggleButtons}
            />
          </div>
          {/* 목록 테이블 */}
          <ListTable>
            <thead>
              <tr>
                <th>상품 번호</th>
                <th>Name</th>
                <th>Price</th>
                <th>모집 인원</th>
                <th>마감일</th>
                <th>주문 내역</th>
                <th>여행확정</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.productNum}>
                  <td>{item.productNum}</td>
                  <td>
                    <Link to={`/package-product/${item.productNum}`}>
                      {item.productName}
                    </Link>
                  </td>
                  <td>{item.price}</td>
                  <td>{item.necessaryPeople}</td>
                  <td style={{ width: '15%' }}>
                    {formatDateTime(item.recruitmentDeadline)}
                  </td>
                  <td>
                    <button onClick={() => handleViewOrderDetail(item.orders)}>
                      보기
                    </button>
                  </td>
                  <td>
                    {item.recruitmentConfirmed ? (
                      <span>확정</span>
                    ) : (
                      <span>모집중</span>
                    )}
                  </td>
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
        </>
      )}
    </div>
  );
};

export default PartnerOrders;
