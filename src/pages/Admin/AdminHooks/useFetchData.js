import axios from 'axios';
import { useState, useEffect } from 'react';
import packageList from '../packageList.json';

const useFetchData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (endpoint) => {
    try {
      const response = await axios.get(endpoint);
      //setData(response.data);
      setData(packageList);
    } catch (err) {
      console.error('데이터 받아오는 중 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(endpoint);
  }, [endpoint]);

  return { data, loading };
};

export default useFetchData;