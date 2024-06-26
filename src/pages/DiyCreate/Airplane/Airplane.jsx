import styles from './Airplane.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateRoute } from '../../../_slices/diySlice';
import {
  updateAirline,
  resetForm,
  selectAirline,
} from '../../../_slices/diySlice';
import { fetchAirline } from './fetchAirline';
// components
import DiyFlightCard from '../../../components/Diy/DiyFlightCard';
import ControllableStates from './ControllableStates/ControllableStates';

const Airplane = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startFlight, setStartFlight] = useState([]);
  const [returnFlight, setReturnFlight] = useState([]);
  const [selectedStart, setSelectedStart] = useState(-1);
  const [selectedReturn, setSelectedReturn] = useState(-1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //리덕스에 저장된 항공편 정보
  const airline = useSelector(selectAirline);

  const handleInputValues = (e) => {
    e.preventDefault();
    setSelectedStart(-1);
    setSelectedReturn(-1);
    setStartFlight([]);
    setReturnFlight([]);
    fetchAirline(
      startDate,
      endDate,
      startLocation,
      endLocation,
      setStartFlight,
      setReturnFlight
    );
    dispatch(resetForm());
    dispatch(updateRoute({ startDate, endDate }));
  };

  const handleSelectedStart = (flight, index) => {
    setSelectedStart(index);
    dispatch(
      updateAirline({
        startAirlineName: flight.airlineName,
        startingPoint: flight.startingPoint,
        destination: flight.destination,
        startFlightNum: flight.flightNum,
        boardingDate: flight.date,
      })
    );
  };

  const handleSelectedReturn = (flight, index) => {
    setSelectedReturn(index);
    dispatch(
      updateAirline({
        comeAirlineName: flight.airlineName,
        comeFlightNum: flight.flightNum,
        comingDate: flight.date,
      })
    );
  };

  return (
    <div className={styles.airplane_box}>
      <form className={styles.Airplane} onSubmit={handleInputValues}>
        <ControllableStates labelName="출발지" setLocation={setStartLocation} />
        <ControllableStates labelName="도착지" setLocation={setEndLocation} />
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          검색
        </button>
      </form>
      {selectedReturn >= 0 && (
        <button
          onClick={() => navigate('/diy-create?step=schedule')}
          className={styles.link_schedule}
        >
          일정 만들기
        </button>
      )}
      <div className={styles.airplane_information}>
        <div>
          {startFlight &&
            startFlight.length > 0 &&
            startFlight.map((flight, index) => (
              <div
                key={`start-${index}`}
                onClick={() => {
                  handleSelectedStart(flight, index);
                }}
                className={selectedStart === index ? styles.selectedFlight : ''}
              >
                <DiyFlightCard flight={flight} type={'departure'} />
              </div>
            ))}
        </div>
        <div>
          {returnFlight &&
            returnFlight.length > 0 &&
            returnFlight.map((flight, index) => (
              <div
                key={`return-${index}`}
                onClick={() => {
                  handleSelectedReturn(flight, index);
                }}
                className={
                  selectedReturn === index ? styles.selectedFlight : ''
                }
              >
                <DiyFlightCard flight={flight} />
              </div>
            ))}
        </div>
      </div>
      {/*리덕스 스토어에 항공편 정보 있을 때 조건부 렌더링 */}
      {airline.startAirlineName && (
        <>
          <h3>선택한 항공권</h3>
          <p>다른 항공편을 보려면 재검색 해주세요</p>
        </>
      )}
      <div style={{ display: 'flex', gap: '1rem' }}>
        {airline.startAirlineName && (
          <DiyFlightCard
            flight={{
              flightNum: airline.startFlightNum,
              date: airline.boardingDate,
              airlineName: airline.startAirlineName,
              startingPoint: airline.startingPoint,
              destination: airline.destination,
            }}
            type={'departure'}
          />
        )}
        {airline.comeAirlineName && (
          <DiyFlightCard
            flight={{
              flightNum: airline.comeFlightNum,
              date: airline.comingDate,
              airlineName: airline.comeAirlineName,
              startingPoint: airline.destination,
              destination: airline.startingPoint,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Airplane;
