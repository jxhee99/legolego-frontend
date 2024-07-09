// useFetchDiyData.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const useFetchData = (endpoint) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        dispatch({ type: 'SET_DIY_DATA', payload: data });
      } catch (err) {
        setError(err); // 에러 설정
        console.error('데이터 받아오는 중 오류:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Optionally, you might return data, loading, and refetch functions here.
    // Ensure to adapt based on your hook implementation.
  }, [dispatch, endpoint]);

  // Return whatever you need from this hook, like data, loading, refetch, etc.
  return { loading, error };
};

export default useFetchData;
