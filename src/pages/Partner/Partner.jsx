import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import ImageSlide from './PartnerHome.jsx/ImageSlide';

const Partner = () => {
  const { role } = useContext(AuthContext);

  if (role !== 'PARTNER') {
    return <div>권한이 없습니다.</div>;
  }
  return <ImageSlide />;
};

export default Partner;
