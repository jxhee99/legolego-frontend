import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './DiyDetail.module.css';
import DiyDetailAirplane from './DiyDetailAirplane/DiyDetailAirplane';
import DiyDetailSchedule from './DiyDetailSchedule/DiyDetailSchedule';
import useFetchData from '../../hooks/useFetchDiyData';
import axios from 'axios';
import Metas from '../../components/common/Metas';

const DiyDetail = () => {
  const { id } = useParams(); // useParams 훅을 사용하여 URL에서 id(packageNum) 값을 가져옴
  const endpoint = `/api/packages/${id}`;
  const { data, loading, error, refetch } = useFetchData(endpoint);

  const [airline, setAirline] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [desc, setDesc] = useState({});
  const [writer, setWriter] = useState({});
  const [likedNum, setLikedNum] = useState();
  const [isLiked, setIsLiked] = useState(false); //응원 여부 상태
  const [isWriter, setIsWriter] = useState(false);

  useEffect(() => {
    if (data) {
      setAirline(data.airline);
      setSchedule(data.detailCourses);
      setDesc(data.packageForm);
      setWriter(data.user);
      setLikedNum(data.likedNum);
      setIsLiked(data.isLiked); // 서버에서 받아온 응원 여부 설정
      setIsWriter(data.isWriter);
    }
  }, [data]);

  const handleLike = async () => {
    const userRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    if (!token || userRole != 'USER') {
      window.alert('로그인한 유저만 가능합니다.');
      return;
    }
    try {
      const response = await axios.post(
        `/api/user/packages/likes/${id}`,
        {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // 요청이 성공한 경우
        console.log('성공');
        //refetch();
        setLikedNum(likedNum + 1);
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

  // 에러 발생 시
  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  // 데이터가 없을 때
  if (!data || data.length === 0) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <>
      <Metas title={desc.packageName} />
      <div className={styles.DiyDetail}>
        <div>
          <div className={styles.thumbnail_cheer_box}>
            <div className={styles.diy_thumbnail}>
              <img src={desc.profileImg} alt="" />
            </div>
            <div className={styles.cheer_user_box}>
              <p>{data.regDate}</p>
              <h2>{desc.packageName}</h2>
              <div className={styles.user}>
                <span>{writer.userNickname}</span>
                <AccountCircleIcon />
              </div>
              <div className={styles.like_view_box}>
                <ThumbUpAltIcon />
                <div>{likedNum}</div>
                <VisibilityIcon />
                <div>{data.viewNum}</div>
              </div>
              <h3>응원하기를 눌러 같이 여행 떠나요!</h3>
              {isWriter ? ( // 작성자일 경우 렌더링
                <button className={styles.cheer_button}>응원 받는 중!</button>
              ) : !isLiked ? ( // 응원하지 않은 경우 버튼 렌더링
                <button className={styles.cheer_button} onClick={handleLike}>
                  응원하기
                </button>
              ) : (
                // 응원 완료한 경우 버튼 렌더링
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
    </>
  );
};

export default DiyDetail;
