import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//컴포넌트
import ListTable from '../../../components/List/ListTable';
import ListModal from '../../../components/List/ListModal';

//api 요청
import useFetchData from '../../../hooks/useFetchListData';

const PriceList = () => {
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
  const [selectedItem, setSelectedItem] = useState(null);

  //get요청
  const endpoint = '/api/diylists/user/1';
  const { data, loading, refetch } = useFetchData(endpoint);

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

  //승인요청
  const handleApprove = async (item) => {
    try {
      const response = await axios.post(
        `/api/diylists/user/1/accept?list_num=${item.listNum}&package_num=${item.diyPackage.packageNum}`
      );

      if (response.status === 200) {
        // 요청이 성공한 경우
        console.log('승인');
        refetch(); // 데이터 다시 가져오기
      } else {
        console.error('승인 실패:', response.status);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <>
      <ListTable>
        <thead>
          <tr>
            <th>패키지 번호</th>
            <th>Name</th>
            <th>partner</th>
            <th>가격</th>
            <th>상세</th>
            <th>제안받기</th>
            <th>승인여부</th>
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
              <td>{item.partner.companyName}</td>
              <td>
                <button>{item.price}</button>
              </td>
              <td onClick={() => openModal(item)}>
                <button>보기</button>
              </td>
              <td>
                {item.isSelected === null && (
                  <span onClick={() => handleApprove(item)}>
                    <button>받기</button>
                  </span>
                )}
                {item.isSelected === true && <span>선택됨</span>}
                {item.isSelected === false && <span>미선택</span>}
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
        title="가격 상세"
      >
        {selectedItem && (
          <div>
            <p>여행사: {selectedItem.partner.companyName}</p>
            <p>가격: {selectedItem.price}</p>
            <p>모집 인원: {selectedItem.necessaryPeople}</p>
            <p>특별 혜택: {selectedItem.specialBenefits}</p>
          </div>
        )}
      </ListModal>
    </>
  );
};

export default PriceList;
