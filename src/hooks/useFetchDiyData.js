import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // 에러 상태 추가


  const fetchData = async (endpoint) => {
    try {
      console.log('Sending request to:', endpoint);  // 요청 URL을 콘솔에 출력
      const token = localStorage.getItem('token');
      const response = await axios.get(endpoint, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setData(response.data);
      console.log('Fetched data:', response.data);  // 응답 데이터를 콘솔에 출력
    } catch (err) {
      setError(err);  // 에러 설정
      console.error('데이터 받아오는 중 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (endpoint) {
    fetchData(endpoint);
    } else {
      console.error('Endpoint is not defined');
    }
  }, [endpoint]);

  return { data, loading, error, refetch: () => fetchData(endpoint) };
};

export default useFetchData;