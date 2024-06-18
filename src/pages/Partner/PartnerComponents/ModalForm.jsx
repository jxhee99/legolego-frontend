// AdminComponents/ModalForm.jsx
import React from 'react';

const ModalForm = ({ formData, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>가격:</label>
      <input
        type="text"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        required
      />
      <br />
      <label>모집인원:</label>
      <input
        type="text"
        name="necessaryPeople"
        value={formData.necessaryPeople}
        onChange={handleInputChange}
        required
      />
      <br />
      <label>특별혜택:</label>
      <input
        type="text"
        name="specialBenefits"
        value={formData.specialBenefits}
        onChange={handleInputChange}
        required
      />
      <br />
      <button type="submit">등록</button>
    </form>
  );
};

export default ModalForm;
