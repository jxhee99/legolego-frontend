import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (endpoint) => {
    try {
      console.log('Sending request to:', endpoint);  // 요청 URL을 콘솔에 출력
      const response = await axios.get(endpoint, {
        headers: {
          'Accept': 'application/json'
        }
      });
      setData(response.data);
      console.log('Fetched data:', response.data);  // 응답 데이터를 콘솔에 출력
    } catch (err) {
      console.error('데이터 받아오는 중 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(endpoint);
  }, [endpoint]);

  return { data, loading, refetch: () => fetchData(endpoint) };
};

export default useFetchData;