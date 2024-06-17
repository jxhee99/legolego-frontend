import React from 'react';
import { useEffect, useState } from 'react';
import styles from './AdminListLikesOver.module.css';
import useHandlers from '../AdminHooks/useHandlers';

import packageList from '../packageList.json';
import Modal from '../AdminComponents/Modal';
import ModalForm from '../AdminComponents/ModalForm';

const AdminListLikesOver = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({
    productName: '',
    recruitment: '',
    recruitmentPeriod: '',
  });

  const { handleApprove, handleReject, handleViewPrice } = useHandlers();

  //get 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await axios.get('/admin/liked-packages');
        //setData(response.data);
        setData(packageList);
      } catch (err) {
        console.error('데이터 받아오는 중 오류:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      //await axios.post(`/admin/liked-packages/{selectedItem.packageNum}`, {
      //   productName: formData.productName,
      //   recruitment: formData.recruitment,
      //   recruitmentPeriod: formData.recruitmentPeriod,
      // });
      console.log('등록할 상품명:', formData.productName);
      console.log('등록할 모집인원:', formData.recruitment);
      console.log('등록할 모집기간:', formData.recruitmentPeriod);
      closeModal();
    } catch (err) {
      console.error('상품 등록 중 오류:', err);
    }
  };

  return (
    <div>
      <div>응원달성목록</div>
      <table border="1">
        <thead>
          <tr>
            <th>패키지 번호</th>
            <th>Name</th>
            <th>작성자</th>
            <th>승인여부</th>
            <th>승인</th>
            <th>거절</th>
            <th>partner</th>
            <th>가격보기</th>
            <th>상품등록</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.listNum}>
              <td>{item.packageNum}</td>
              <td>{item.packageName}</td>
              <td>{item.user}</td>
              <td>
                {!item.packageApproval ? (
                  <span>미승인</span>
                ) : (
                  <span>승인</span>
                )}
              </td>
              <td>
                {!item.packageApproval ? (
                  <button onClick={() => handleApprove(item)}>승인</button>
                ) : (
                  <button className={styles.disabledButton} disabled>
                    승인
                  </button>
                )}
              </td>
              <td>
                {!item.packageApproval ? (
                  <button onClick={() => handleReject(item)}>거절</button>
                ) : (
                  <button className={styles.disabledButton} disabled>
                    거절
                  </button>
                )}
              </td>
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
      </table>
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
    </div>
  );
};

export default AdminListLikesOver;
