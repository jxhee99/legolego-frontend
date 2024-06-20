import styles from './Airplane.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateAirline, updateRoute } from '../../../_slices/diySlice';
import { formatDate } from '../../../utils/util';

// components
import StartCard from '../StartCard/StartCard';
import ReturnCard from '../ReturnCard/ReturnCard';
import ControllableStates from './ControllableStates/ControllableStates';

function extractCode(inputString) {
  return inputString.split(', ')[0];
}

const Airplane = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [flightData, setFlightData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAirline = async () => {
    try {
      const response = await axios.get(
        `/api/api/airline?schDate=${formatDate(startDate)}&returnDate=${formatDate(endDate)}&schDeptCityCode=${extractCode(startLocation)}&schArrvCityCode=${extractCode(endLocation)}`
      );
      console.log(response.data);
      setFlightData(response.data);
    } catch (error) {
      console.error('Error fetching airline data:', error);
    }
  };

  const handleInputValues = (e) => {
    e.preventDefault();
    fetchAirline();
  };

  const onClick = (flightInfo) => {
    console.log('클릭한 비행 정보:', flightInfo);
    const { type, ...info } = flightInfo;
    const storageKey =
      type === 'start' ? 'selectedStartFlight' : 'selectedReturnFlight';
    localStorage.setItem(storageKey, JSON.stringify(info));

    dispatch(
      updateAirline({
        startAirlineName: '',
        startingPoint: '',
        destination: '',
        startFlightNum: '',
        boardingDate: '',
        comeAirlineName: '',
        comeFlightNum: '',
        comingDate: '',
      })
    );
    dispatch(updateRoute({ startDate, endDate }));
  };

  return (
    <>
      <form className={styles.Airplane} onSubmit={handleInputValues}>
        <ControllableStates labelName="출발지" setLocation={setStartLocation} />
        <ControllableStates labelName="도착지" setLocation={setEndLocation} />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          검색
        </button>
      </form>

      <div className={styles.airplane_information}>
        <div>
          {flightData &&
            flightData.startData &&
            flightData.startData.length > 0 &&
            flightData.startData.map((flight, index) => (
              <StartCard key={`start-${index}`} {...flight} onClick={onClick} />
            ))}
        </div>
        <div>
          {flightData &&
            flightData.startData &&
            flightData.startData.length > 0 &&
            flightData.startData.map((flight, index) => (
              <ReturnCard
                key={`return-${index}`}
                {...flight}
                onClick={onClick}
              />
            ))}
        </div>
      </div>

      <button onClick={() => navigate('/diy-create?step=schedule')}>
        일정 선택하기
      </button>
    </>
  );
};

export default Airplane;
