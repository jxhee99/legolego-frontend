import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PaginationComp from '../../../components/Pagination/PaginationComp';
import PartnerOrderDetail from './PartnerOrderDetail';
import ListTable from '../../../components/List/ListTable';
import useFetchData from '../../../hooks/useFetchDiyData';
import { formatDateTime } from '../../../utils/DateTime';

import styles from '../../../components/List/List.module.css';

const PartnerOrders = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 초기 상태와 변수 설정
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;
  const initialFilter = query.get('filter') === 'true';
  const itemsPerPage = 10;
  const endpoint = '/api/partner/products';

  // 상태 관리
  const [filterApplied, setFilterApplied] = useState(initialFilter);
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
  const filteredData = filterApplied
    ? data.filter((item) => item.recruitmentConfirmed === true)
    : data;

  // 현재 페이지에 맞는 데이터 계산
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // 필터 토글 함수
  const toggleFilter = () => {
    setFilterApplied(!filterApplied);
    setPage(1);
  };

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

          {/* 필터 버튼 */}
          <button onClick={toggleFilter} className={styles.filter_button}>
            {filterApplied ? '전체 보기' : '모집 확정'}
          </button>

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
                <th>모집확정</th>
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
              filterApplied={filterApplied}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PartnerOrders;
