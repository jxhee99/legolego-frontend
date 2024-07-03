import apiClient from '../api/apiClient';

export const deleteList = async (e, endpoint, refetch, closeModal) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    const response = await apiClient.delete(endpoint);

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

