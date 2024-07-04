import styles from './Profile.module.css';
import { useState, useContext } from 'react';
import apiClient from '../../api/apiClient';
import { AuthContext } from '../../contexts/AuthContext';

const PasswordChange = ({ endpoint }) => {
  const { logout } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const validateField = (name, value) => {
    const newErrors = {};

    // 필드 별 유효성 검사 로직
    switch (name) {
      case 'currentPassword':
        if (!value) newErrors.currentPassword = '비밀번호를 입력해주세요.';
        else if (value.length < 8)
          newErrors.currentPassword = '비밀번호는 최소 8자 이상이어야 합니다.';
        else newErrors.currentPassword = '';
        break;
      case 'newPassword':
        if (!value) newErrors.newPassword = '비밀번호를 입력해주세요.';
        else if (value.length < 8)
          newErrors.newPassword = '비밀번호는 최소 8자 이상이어야 합니다.';
        else newErrors.newPassword = '';
        break;
      case 'confirmPassword':
        if (value !== formData.newPassword)
          newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        else newErrors.confirmPassword = '';
        break;
      default:
        break;
    }

    return newErrors;
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 각 필드별 실시간 유효성 검사
    const formErrors = validateField(name, value);
    setErrors((prev) => ({ ...prev, ...formErrors }));
  };

  const handleSubmit = async () => {
    // 모든 필드의 유효성 검사
    let formErrors = {};
    Object.keys(formData).forEach((name) => {
      formErrors = { ...formErrors, ...validateField(name, formData[name]) };
    });
    setErrors(formErrors);

    // 에러가 있는 경우 제출을 중지
    if (Object.values(formErrors).some((error) => error !== '')) {
      return;
    }

    try {
      const response = await apiClient.patch({ endpoint }, formData);

      if (response.status === 200) {
        alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인 해주세요');
        logout();
      } else {
        alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form>
      <div className={styles.Input}>
        <label htmlFor="currentPassword">기존 비밀번호</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          readOnly={!editMode}
          onChange={handleChange}
          className={editMode ? styles.active : ''}
        />
        {errors.currentPassword && (
          <p className={styles.error}>{errors.currentPassword}</p>
        )}
      </div>
      <div className={styles.Input}>
        <label htmlFor="newPassword">새로운 비밀번호</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          readOnly={!editMode}
          onChange={handleChange}
          className={editMode ? styles.active : ''}
        />
        {errors.newPassword && (
          <p className={styles.error}>{errors.newPassword}</p>
        )}
      </div>
      <div className={styles.Input}>
        <label htmlFor="confirmPassword">비밀번호 재확인</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          readOnly={!editMode}
          onChange={handleChange}
          className={editMode ? styles.active : ''}
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword}</p>
        )}
      </div>
      {editMode ? (
        <button className={styles.button} type="button" onClick={handleSubmit}>
          제출
        </button>
      ) : (
        <button
          className={styles.button}
          type="button"
          onClick={handleEditClick}
        >
          비밀번호 변경
        </button>
      )}
    </form>
  );
};

export default PasswordChange;
