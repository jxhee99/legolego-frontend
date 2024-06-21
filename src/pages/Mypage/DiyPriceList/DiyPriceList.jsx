import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../components/List/List.module.css';
//컴포넌트
import ListTable from '../../../components/List/ListTable';
import ListModal from '../../../components/List/Modal/ListModal';

//api 요청
import useFetchData from '../../../hooks/useFetchListData';

const DiyPriceList = () => {
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
        refetch();
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
              <td>{item.partner.companyName}</td>
              <td>{item.price}</td>
              <td onClick={() => openModal(item)}>
                <button>보기</button>
              </td>
              <td>
                {item.isSelected === null && (
                  <span onClick={() => handleApprove(item)}>
                    <button>받기</button>
                  </span>
                )}
                {item.isSelected === true && <span>수락</span>}
                {item.isSelected === false && <span>거절</span>}
              </td>
              <td>
                {item.isRegistered && (
                  <Link to={`/package-product/${item.productNum}`}>완료</Link>
                )}
                {item.isSelected === true && item.isRegistered === false && (
                  <span>대기중</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </ListTable>
      <ListModal
        isVisible={modalOpen}
        closeModal={closeModal}
        title="제안 상세"
      >
        {selectedItem && (
          <div className={styles.modal_text_box}>
            <div className={styles.detail}>
              <span>패키지:</span>
              <p>{selectedItem.diyPackage.packageName}</p>
            </div>
            <div className={styles.detail}>
              <span>가격:</span>
              <p>{selectedItem.price}</p>
            </div>
            <div className={styles.detail}>
              <span>모집인원:</span>
              <p>{selectedItem.necessaryPeople}</p>
            </div>
            <div className={styles.detail}>
              <span>스페셜혜택:</span>
              <p>{selectedItem.specialBenefits}</p>
            </div>
          </div>
        )}
      </ListModal>
    </>
  );
};

export default DiyPriceList;
