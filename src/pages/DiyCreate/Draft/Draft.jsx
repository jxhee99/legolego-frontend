import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import styles from './Draft.module.css';

const Draft = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/user/packages/drafts');
        if (response.status === 200) {
          setData(response.data);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error('임시 저장 불러오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  const deleteDetail = async (endpoint, navigate) => {
    try {
      const response = await apiClient.delete(endpoint);
      if (response.status === 204) {
        navigate();
      }
    } catch (err) {
      console.error('삭제 중 오류', err);
      if (err.response && err.response.data) {
        window.alert(err.response.data || '삭제 중 오류가 발생했습니다.');
      } else {
        window.alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const goEdit = () => {
    navigate(`/diy-edit/${data.packageNum}`);
  };

  const handleDelete = () => {
    deleteDetail(`/user/packages/${data.packageNum}`, () =>
      navigate('/diy-create?step=airplane')
    );
  };

  return (
    data && (
      <div className={styles.go_draft_box}>
        <p>임시 저장된 글이 있습니다.</p>
        <button className={styles.go_button} onClick={goEdit}>
          보러 가기
        </button>
        <button className={styles.delete_button} onClick={handleDelete}>
          삭제
        </button>
      </div>
    )
  );
};

export default Draft;
