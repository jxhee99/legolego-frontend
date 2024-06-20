import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetchData from '../../../hooks/useFetchListData';
import ListTable from '../../../components/List/ListTable';
import ListModal from '../../../components/List/ListModal';

const ListPrice = () => {
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
  const [selectedItem, setSelectedItem] = useState(null);

  //get요청
  const endpoint = '/api/diylists/partner/3';
  const { data, loading } = useFetchData(endpoint);

  if (loading) {
    return <div>Loading...</div>;
  }

  // 모달 열기
  const openModal = (item) => {
    setSelectedItem(item); // 선택된 아이템 설정
    setModalOpen(true); // 모달 열기
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedItem(null); // 선택된 아이템 초기화
    setModalOpen(false); // 모달 닫기
  };

  return (
    <>
      <ListTable>
        <thead>
          <tr>
            <th>패키지 번호</th>
            <th>Name</th>
            <th>작성자</th>
            <th>가격</th>
            <th>모집인원</th>
            <th>혜택</th>
            <th>채택여부</th>
            <th>상품등록</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.listNum}>
              <td>{item.diyPackage.packageNum}</td>
              <td>
                <Link to={`/diy/${item.diyPackage.packageNum}`}>
                  {item.diyPackage.packageName}
                </Link>
              </td>
              <td>{item.diyPackage.user.userNickname}</td>
              <td>
                <button>{item.price}</button>
              </td>
              <td>{item.necessaryPeople}</td>
              <td>{item.specialBenefits}</td>
              <td>
                {item.isSelected ? <span>채택</span> : <span>미채택</span>}
              </td>
              <td>
                {item.isRegistered ? (
                  <Link to={`/package-product/${item.productNum}`}>
                    보러가기
                  </Link>
                ) : (
                  <span></span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </ListTable>
      <ListModal
        isVisible={modalOpen}
        closeModal={closeModal}
        title="제안한 가격"
      >
        {selectedItem && (
          <div>
            <p>선택된 패키지 번호: {selectedItem.diyPackage.packageNum}</p>
            <p>가격:{selectedItem.price}</p>
            <p>모집인원:{selectedItem.necessaryPeople}</p>
            <p>스페셜혜택:{selectedItem.specialBenefits}</p>
          </div>
        )}
      </ListModal>
    </>
  );
};

export default ListPrice;
