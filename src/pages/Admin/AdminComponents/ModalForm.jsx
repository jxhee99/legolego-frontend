// AdminComponents/ModalForm.jsx
import React from 'react';

const ModalForm = ({ formData, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>상품명:</label>
      <input
        type="text"
        name="productName"
        value={formData.productName}
        onChange={handleInputChange}
        required
      />
      <br />
      <label>모집인원:</label>
      <input
        type="text"
        name="recruitment"
        value={formData.recruitment}
        onChange={handleInputChange}
        required
      />
      <br />
      <label>모집기간:</label>
      <input
        type="text"
        name="recruitmentPeriod"
        value={formData.recruitmentPeriod}
        onChange={handleInputChange}
        required
      />
      <br />
      <button type="submit">등록</button>
    </form>
  );
};

export default ModalForm;
