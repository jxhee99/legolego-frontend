import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VerticalTabs from './VerticalTabs/VerticalTabs';

const DiyCreateTouristSpot = () => {
  const navigate = useNavigate();
  const startingPoint = useSelector(
    (state) => state.diyCreate.airline.startingPoint
  );

  const onClickButton = () => {
    navigate('/diy-create?step=airplane');
    localStorage.setItem('startingPoint', startingPoint);
  };

  return (
    <>
      <hr />
      <VerticalTabs />
      <button onClick={onClickButton}>항공편 선택하기</button>
    </>
  );
};

export default DiyCreateTouristSpot;
