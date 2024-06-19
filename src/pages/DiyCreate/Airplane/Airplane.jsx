import styles from './Airplane.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ControllableStates from './ControllableStates/ControllableStates';
import AirlineCard from '../AirlineCard/AirlineCard';
import { updateAirline } from '../../../_slices/diySlice';

const Airplane = () => {
  const [airline, setAirline] = useState({ startData: [], returnData: [] });
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/airline', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setAirline(data))
      .catch((error) =>
        console.error('항공사 데이터를 불러오는 중 오류 발생:', error)
      );
  }, []);

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
      <div className={styles.Airplane}>
        <ControllableStates labelName="출발지" />
        <ControllableStates labelName="도착지" />
        <input type="date" />
        <input type="date" />
        <button className={styles.button}>검색</button>
      </div>

      <div className={styles.airplane_information}>
        <div>
          {airline.startData.length > 0 &&
            airline.startData.map((flight, index) => (
              <AirlineCard
                key={`start-${index}`}
                {...flight}
                onClick={onClick}
              />
            ))}
        </div>
        <div>
          {airline.returnData.length > 0 &&
            airline.returnData.map((flight, index) => (
              <AirlineCard
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
