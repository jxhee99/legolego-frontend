import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './DiyDetail.module.css';
import DiyDetailAirplane from './DiyDetailAirplane/DiyDetailAirplane';
import DiyDetailSchedule from './DiyDetailSchedule/DiyDetailSchedule';
import useFetchData from '../../hooks/useFetchDiyData';
import axios from 'axios';

const DiyDetail = () => {
  const { id } = useParams(); // useParams 훅을 사용하여 URL에서 id 값을 가져옴
  const endpoint = `/api/packages/${id}`;
  const { data, loading, refetch } = useFetchData(endpoint);

  const [airline, setAirline] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [desc, setDesc] = useState({});
  const [writer, setWriter] = useState({});
  const [isLiked, setIsLiked] = useState(false); // 추가: 응원 여부 상태

  useEffect(() => {
    if (data) {
      setAirline(data.airline);
      setSchedule(data.detailCourses);
      setDesc(data.packageForm);
      setWriter(data.user);
      setIsLiked(data.liked); // 서버에서 받아온 응원 여부 설정
    }
  }, [data]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/packages/likes/${id}`, {
        userNum: 3,
      });
      if (response.status === 200) {
        // 요청이 성공한 경우
        console.log('성공');
        refetch();
        setIsLiked(true); // 응원 완료 상태로 설정
      } else {
        console.error('승인 실패:', response.status);
      }
    } catch (err) {
      console.error('등록 중 오류:', err);
    }
  };

  // 로딩 중일 때
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.DiyDetail}>
      <div>
        <h2>{desc.packageName}</h2>
        <div className={styles.thumbnail_cheer_box}>
          <div className={styles.diy_thumbnail}>
            <img src={desc.profileImg} alt="" />
          </div>
          <div className={styles.cheer_user_box}>
            <div className={styles.user}>
              <span>{writer.userNickname}</span>
              <img src="/src/assets/images/no-profile.png" alt="profile" />
            </div>
            <div className={styles.like_view_box}>
              <div>응원수 : {data.likedNum}</div>
              <div>조회수 : {data.viewNum}</div>
            </div>
            <h3>응원하기를 눌러 같이 여행 떠나요!</h3>
            {!isLiked ? ( // 응원하지 않은 경우 버튼 렌더링
              <button className={styles.cheer_button} onClick={handleLike}>
                응원하기
              </button>
            ) : (
              <button
                className={styles.cheer_button}
                style={{ cursor: 'default' }}
              >
                응원 완료!
              </button>
            )}
          </div>
        </div>
        <div className={styles.desc_box}>
          <pre>{desc.shortDescription}</pre>
        </div>
      </div>
      {<DiyDetailAirplane airline={airline} />}
      {<DiyDetailSchedule schedule={schedule} />}
    </div>
  );
};

export default DiyDetail;
