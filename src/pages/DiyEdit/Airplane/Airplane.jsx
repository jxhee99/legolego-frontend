import styles from '../../DiyCreate/Airplane/Airplane.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectAirline } from '../../../_slices/diySlice';

// components
import DiyFlightCard from '../../../components/Diy/DiyFlightCard';

const Airplane = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  //리덕스에 저장된 항공편 정보
  const airline = useSelector(selectAirline);

  return (
    <div className={styles.airplane_box} style={{ margin: '2rem 0' }}>
      <div className={styles.selected_box}>
        <h3>선택한 항공권</h3>
        <p>항공편 수정은 삭제 후 새로 작성!</p>
        <div className={styles.selected_flightbox}>
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
        {airline.startAirlineName && airline.comeAirlineName && (
          <button
            onClick={() => navigate(`/diy-edit/${id}?step=schedule`)}
            className={styles.link_schedule}
          >
            일정 수정
          </button>
        )}
      </div>
    </div>
  );
};

export default Airplane;
