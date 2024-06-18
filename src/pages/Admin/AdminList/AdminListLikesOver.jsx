import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import ListTable from '../../../components/List/ListTable';

import Modal from '../AdminComponents/Modal';
import ModalForm from '../AdminComponents/ModalForm';

//백엔드 api 요청관련 함수
import useHandlers from '../AdminHooks/useHandlers';
import useFetchData from '../AdminHooks/useFetchData';

const AdminListLikesOver = () => {
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({
    productName: '',
    recruitment: '',
    recruitmentPeriod: '',
  });

  //가격보기는 다른 파일로 분리
  const { handleViewPrice } = useHandlers();

  //get요청
  const endpoint = '/admin/liked-packages';
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
    setFormData({
      // 폼 데이터 초기화
      productName: '',
      recruitment: '',
      recruitmentPeriod: '',
    });
    setModalOpen(false); // 모달 닫기
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //await axios.post(`/admin/liked-packages/{selectedItem.packageNum}`, formData);
      console.log('등록할 상품명:', formData.productName);
      console.log('등록할 모집인원:', formData.recruitment);
      console.log('등록할 모집기간:', formData.recruitmentPeriod);
      closeModal();
    } catch (err) {
      console.error('상품 등록 중 오류:', err);
    }
  };

  return (
    <>
      <ListTable title={'응원달성목록'}>
        <thead>
          <tr>
            <th>패키지 번호</th>
            <th>Name</th>
            <th>작성자</th>
            <th>partner</th>
            <th>가격보기</th>
            <th>상품등록</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.listNum}>
              <td>{item.packageNum}</td>
              <td>
                <Link to={`/diy/${item.packageNum}`}>{item.packageName}</Link>
              </td>
              <td>{item.user}</td>
              <td>{item.partner}</td>
              <td>
                {item.partner ? (
                  <button onClick={() => handleViewPrice(item)}>보기</button>
                ) : (
                  <span></span>
                )}
              </td>
              <td>
                {item.priceSelected ? (
                  <button onClick={() => openModal(item)}>등록</button>
                ) : (
                  <span></span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </ListTable>
      <Modal isVisible={modalOpen} closeModal={closeModal} title="상품 등록">
        {selectedItem && (
          <div>
            <p>선택된 패키지 번호: {selectedItem.packageNum}</p>
            <ModalForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default AdminListLikesOver;
