import styles from './Airplane.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  selectAirline,
  updateAirline,
  updateRoute,
} from '../../../_slices/diySlice';
import { formatDate } from '../../../utils/util';

// components
import StartCard from '../StartCard/StartCard';
import ReturnCard from '../ReturnCard/ReturnCard';
import ControllableStates from './ControllableStates/ControllableStates';

function extractCode(inputString) {
  return inputString.split(', ')[0];
}

const Airplane = () => {
  const [searchForm, setSerchForm] = useState({
    startData: '',
    returnData: '',
    startLocation: '',
    endLocation: '',
  });
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [flightData, setFlightData] = useState(null);
  const dispatch = useDispatch();

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
          <h3>출발지</h3>
          {flightData &&
            flightData.startData &&
            flightData.startData.length > 0 &&
            flightData.startData.map((flight, index) => (
              <StartCard key={`start-${index}`} {...flight} onClick={onClick} />
            ))}
        </div>
        <div>
          <h3>도착지</h3>
          {flightData &&
            flightData.startData &&
            flightData.startData.length > 0 &&
            flightData.startData.map((flight, index) => (
              <ReturnCard
                key={`start-${index}`}
                {...flight}
                onClick={onClick}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Airplane;
