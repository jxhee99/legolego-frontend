import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './DiyDetail.module.css';
import DiyDetailAirplane from './DiyDetailAirplane/DiyDetailAirplane';
import DiyDetailSchedule from './DiyDetailSchedule/DiyDetailSchedule';
import useFetchData from '../../hooks/useFetchDiyData';

const DiyDetail = () => {
  const { id } = useParams(); // useParams 훅을 사용하여 URL에서 id 값을 가져옴
  const endpoint = `/api/packages/${id}`;
  const { data, loading, refetch } = useFetchData(endpoint);

  const [airline, setAirline] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [desc, setDesc] = useState({});
  const [writer, setWriter] = useState({});

  useEffect(() => {
    if (data) {
      setAirline(data.airline);
      setSchedule(data.detailCourses);
      setDesc(data.packageForm);
      setWriter(data.user);
    }
  }, [data]); // data가 변경될 때 useEffect가 호출되어 상태를 업데이트함

  // 로딩 중일 때
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(data.airline);
  return (
    <div className={styles.DiyDetail}>
      <div>
        <h2>{desc.packageName}</h2>
        <div className={styles.thumbnail_cheer_box}>
          <div className={styles.diy_thumbnail}>
            <img
              src={`https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAUc7tXVMMpirgBgSChtMDIYiH09gZzsgibGVM5EBgx9CAxnbfhCFKhn3WVMV4rHxVSaSBI7RR5n4xx4NZ3-cueTB6LvTu1fvdtvPcBv4dEht861RiyzM0Is92dfZv1XQ0EEsbP3YjNnAU9l6wnK98Dh1gVnzJVZNybwJyI5dnmv5TfBZOE4M&3u400&4u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173&key=AIzaSyAblAMlRJOooJk9NNyvDtHhL8fpd9vtgck&token=22013"`}
              alt=""
            />
          </div>
          <div className={styles.cheer_user_box}>
            <div className={styles.user}>
              <span>{writer.userNickname}</span>
              <img src="/src/assets/images/no-profile.png"></img>
            </div>
            <div className={styles.like_view_box}>
              <div>응원수 : {data.likedNum}</div>
              <div>조회수 : {data.viewNum}</div>
            </div>
            <h3>응원하기를 눌러 같이 여행 떠나요!</h3>
            <button className={styles.cheer_button}>응원하기</button>
          </div>
        </div>
        <div className={styles.desc_box}>
          <div>{desc.shortDescription}</div>
        </div>
      </div>
      {<DiyDetailAirplane airline={airline} />}
      {<DiyDetailSchedule schedule={schedule} />}
    </div>
  );
};

export default DiyDetail;
