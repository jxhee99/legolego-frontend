import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import apiClient from '../../api/apiClient';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setOverLikeData } from '../../_slices/searchDiySlice';

const DiyFilterButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const isFiltered = query.get('filtered');
  // const searchState = useSelector((state) => state.search); // 전체 search state 가져오기

  const [checked, setChecked] = useState(isFiltered);
  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (checked) {
        try {
          const response = await apiClient.get('/packages/over-liked');
          console.log(response.data);
          // 데이터에서 diyPackage 배열을 추출
          const diyPackages = response.data.map((item) => item.diyPackage);
          dispatch(setOverLikeData(diyPackages));
          const searchParams = new URLSearchParams(location.search);
          searchParams.set('filtered', 'true');
          navigate(`${location.pathname}?${searchParams.toString()}`);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('filtered');
        navigate(`${location.pathname}?${searchParams.toString()}`);
      }
    };

    fetchData();
  }, [checked, dispatch]);

  return (
    <div>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <span>응원 달성</span>
    </div>
  );
};

export default DiyFilterButton;
