import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useFetchData from '../../../hooks/useFetchListData';
import ListTable from '../../../components/List/ListTable';
import ListModal from '../../../components/List/ListModal';

const ListPackage = () => {
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
  const [selectedItem, setSelectedItem] = useState(null);

  const [price, setPrice] = useState('');
  const [necessaryPeople, setNecessaryPeople] = useState('');
  const [specialBenefits, setSpecialBenefits] = useState('');

  const endpoint = '/api/partner/over-liked-packages/3';
  //get요청
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
    setNecessaryPeople('');
    setPrice('');
    setSpecialBenefits('');
    setModalOpen(false); // 모달 닫기
  };

  const handleInputChange = (setValue) => (e) => {
    const value = e.target.value;
    setValue(value);
    console.log(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      packageNum: selectedItem.diyPackage.packageNum,
      price: price,
      necessaryPeople: necessaryPeople,
      specialBenefits: specialBenefits,
    };

    try {
      const response = await axios.post(
        `/api/partner/over-liked-packages/3/offer`,
        formData, // JSON 형식의 데이터
        {
          headers: {
            'Content-Type': 'application/json', // JSON 형식으로 보냄을 명시
          },
        }
      );
      console.log('등록할 가격제안:', formData);
      if (response.status === 201) {
        // 요청이 성공한 경우
        closeModal();
        refetch();
      }
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
      <ListModal
        isVisible={modalOpen}
        closeModal={closeModal}
        title="가격 등록"
      >
        {selectedItem && (
          <div>
            <p>선택된 패키지 번호: {selectedItem.diyPackage.packageNum}</p>
            <form onSubmit={handleSubmit}>
              <label>가격:</label>
              <input
                type="text"
                name="price"
                value={price}
                onChange={handleInputChange(setPrice)}
                required
              />
              <br />
              <label>모집인원:</label>
              <input
                type="text"
                name="necessaryPeople"
                value={necessaryPeople}
                onChange={handleInputChange(setNecessaryPeople)}
                required
              />
              <br />
              <label>특별혜택:</label>
              <input
                type="text"
                name="specialBenefits"
                value={specialBenefits}
                onChange={handleInputChange(setSpecialBenefits)}
                required
              />
              <br />
              <button type="submit">등록</button>
            </form>
          </div>
        )}
      </ListModal>
    </>
  );
};

export default ListPackage;
