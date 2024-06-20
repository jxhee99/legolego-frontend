import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetchData from '../PartnerHooks/useFetchData';
import ListTable from '../../../components/List/ListTable';
import Modal from '../PartnerComponents/Modal';
import ModalForm from '../PartnerComponents/ModalForm';

const ListPackage = () => {
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({
    price: '',
    necessaryPeople: '',
    specialBenefits: '',
  });

  //get요청
  const endpoint = '/api/partner/over-liked-packages/3';
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
      price: '',
      necessaryPeople: '',
      specialBenefits: '',
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
      console.log('등록할 가격제안:', formData);
      closeModal();
    } catch (err) {
      console.error('상품 등록 중 오류:', err);
    }
  };

  return (
    <>
      <ListTable>
        <thead>
          <tr>
            <th>패키지 번호</th>
            <th>Name</th>
            <th>작성자</th>
            <th>가격등록</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.overLikedListNum}>
              <td>{item.diyPackage.packageNum}</td>
              <td>
                <Link to={`/diy/${item.diyPackage.packageNum}`}>
                  {item.diyPackage.packageName}
                </Link>
              </td>
              <td>{item.diyPackage.user.userNickname}</td>
              <td>
                <button onClick={() => openModal(item)}>등록</button>
              </td>
            </tr>
          ))}
        </tbody>
      </ListTable>
      <Modal isVisible={modalOpen} closeModal={closeModal} title="가격 등록">
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

export default ListPackage;
