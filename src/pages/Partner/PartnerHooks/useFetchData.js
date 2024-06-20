import axios from 'axios';
import { useState, useEffect } from 'react';
import packageList from '../packageListPartner.json';
import packageListPrice from "../packageListPrice.json"
const useFetchData = (endpoint) => {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
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

  return { data, data2, loading };
};

export default useFetchData;