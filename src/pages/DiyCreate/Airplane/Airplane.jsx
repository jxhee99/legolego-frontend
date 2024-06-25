import styles from './Airplane.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateRoute } from '../../../_slices/diySlice';
import { updateAirline, resetForm } from '../../../_slices/diySlice';
import axios from 'axios';
import { formatDate } from '../../../utils/util';
import { formatTimeString } from '../../../utils/DateTime';

// components
import DiyFlightCard from '../../../components/Diy/DiyFlightCard';
import ControllableStates from './ControllableStates/ControllableStates';

function extractCode(inputString) {
  return inputString.split(', ')[0];
}

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

  const fetchAirline = async () => {
    try {
      const response = await axios.get(
        `/api/api/airline?schDate=${formatDate(startDate)}&returnDate=${formatDate(endDate)}&schDeptCityCode=${extractCode(startLocation)}&schArrvCityCode=${extractCode(endLocation)}`
      );
      console.log(response.data);
      console.log(startDate);
      const flightData = response.data;

      const newStartFlights = flightData.startData.map((flight) => ({
        flightNum: flight.internationalNum,
        date: `${startDate}T${formatTimeString(flight.internationalTime)}:00`,
        airlineName: flight.airlineKorean,
        startingPoint: flight.airport,
        destination: flight.city,
      }));

      setStartFlight((prevStartFlights) => [
        ...prevStartFlights,
        ...newStartFlights,
      ]);

      const newReturnFlights = flightData.returnData.map((flight) => ({
        flightNum: flight.internationalNum,
        date: `${endDate}T${formatTimeString(flight.internationalTime)}:00`,
        airlineName: flight.airlineKorean,
        startingPoint: flight.airport,
        destination: flight.city,
      }));

      setReturnFlight((prevReturnFlights) => [
        ...prevReturnFlights,
        ...newReturnFlights,
      ]);
    } catch (error) {
      console.error('Error fetching airline data:', error);
    }
  };

  const handleInputValues = (e) => {
    e.preventDefault();
    fetchAirline();
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
    </div>
  );
};

export default Airplane;
