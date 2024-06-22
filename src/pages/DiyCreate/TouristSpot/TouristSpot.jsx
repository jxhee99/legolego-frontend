import { useNavigate } from 'react-router-dom';

import AirportTabs from './AirportTabs';

const DiyCreateTouristSpot = () => {
  const navigate = useNavigate();

  const onClickButton = () => {
    navigate('/diy-create?step=airplane');
  };

  return (
    <>
      <hr />
      <AirportTabs />
      <button onClick={onClickButton}>항공편 선택하기</button>
    </>
  );
};

export default DiyCreateTouristSpot;
