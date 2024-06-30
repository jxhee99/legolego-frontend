import axios from 'axios';

const handleDelete = async (e, endpoint, refetch, closeModal) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(endpoint, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 204) {
      closeModal();
      refetch();
    } else {
      console.error('삭제 실패:', response.status);
    }
    closeModal();
  } catch (err) {
    console.error('삭제 중 오류:', err);
  }
};

export default handleDelete;