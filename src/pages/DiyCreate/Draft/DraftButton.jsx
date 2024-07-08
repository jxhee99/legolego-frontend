import React from 'react';
import { useNavigate } from 'react-router-dom';
import styls from './Draft.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAirline,
  selectRoute,
  selectDetailCourses,
  resetForm,
} from '../../../_slices/diySlice';

import apiClient from '../../../api/apiClient';

const DraftButton = ({ packageName, shortDesc }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const airline = useSelector(selectAirline);
  const route = useSelector(selectRoute);
  const detailCourses = useSelector(selectDetailCourses);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      airline,
      route,
      detailCourses: detailCourses,
      packageForm: {
        packageName: packageName,
        shortDescription: shortDesc,
      },
    };

    console.log(formData);
    try {
      const response = await apiClient.post('/user/packages/draft', formData);

      if (response.status === 201) {
        // 요청이 성공한 경우
        console.log('승인');
        const packageNum = response.data;
        navigate(`/diy`);
        dispatch(resetForm());
      } else {
        console.error('승인 실패:', response.status);
      }
    } catch (err) {
      console.error('등록 중 오류:', err);
      if (err.response) {
        console.error('응답 데이터:', err.response.data);
      }
    }
  };
  return (
    <div className={styls.save_draft}>
      <button className={styls.save_button} onClick={handleSubmit}>
        임시 저장
      </button>
    </div>
  );
};

export default DraftButton;
