import styles from './Airplane.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ControllableStates from './ControllableStates/ControllableStates';
import {
  selectAirline,
  updateAirline,
  updateRoute,
} from '../../../_slices/diySlice';
import { formatDate } from '../../../utils/util';
import axios from 'axios';

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

  const airline = useSelector(selectAirline);

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
        {flightData ? (
          <div>
            <h2>항공편 정보:</h2>
            <pre>{JSON.stringify(flightData, null, 2)}</pre>
          </div>
        ) : (
          <div>항공편 정보를 입력하고 검색을 눌러주세요.</div>
        )}
      </div>
    </>
  );
};

export default Airplane;
