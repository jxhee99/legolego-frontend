import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetchData from '../PartnerHooks/useFetchData';
import ListTable from '../../../components/List/ListTable';
import Modal from '../PartnerComponents/Modal';

const ListPrice = () => {
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({
    productName: '',
    recruitment: '',
    recruitmentPeriod: '',
  });

  //get요청
  const endpoint = '/partner/approved_packages';
  const { data2, loading } = useFetchData(endpoint);

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
    setFormData({
      // 폼 데이터 초기화
      productName: '',
      recruitment: '',
      recruitmentPeriod: '',
    });
    setModalOpen(false); // 모달 닫기
  };

  return (
    <>
      <ListTable title={'가격제안 목록'}>
        <thead>
          <tr>
            <th>패키지 번호</th>
            <th>Name</th>
            <th>작성자</th>
            <th>제안 가격</th>
            <th>채택여부</th>
          </tr>
        </thead>
        <tbody>
          {data2.map((item) => (
            <tr key={item.listNum}>
              <td>{item.packageNum}</td>
              <td>
                <Link to={`/diy/${item.packageNum}`}>{item.packageName}</Link>
              </td>
              <td>{item.user}</td>
              <td>
                <button onClick={() => openModal(item)}>{item.price}</button>
              </td>
              <td>
                {item.isSelected ? <span>채택</span> : <span>미채택</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </ListTable>
      <Modal isVisible={modalOpen} closeModal={closeModal} title="제안한 가격">
        {selectedItem && (
          <div>
            <p>선택된 패키지 번호: {selectedItem.packageNum}</p>
            <p>가격:{selectedItem.price}</p>
            <p>모집인원:{selectedItem.necessaryPeople}</p>
            <p>스페셜혜택:{selectedItem.specialBenefits}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ListPrice;
