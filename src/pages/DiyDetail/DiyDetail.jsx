import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './DiyDetail.module.css';
import DiyDetailAirplane from './DiyDetailAirplane/DiyDetailAirplane';
import DiyDetailSchedule from './DiyDetailSchedule/DiyDetailSchedule';
import useFetchData from '../../hooks/useFetchDiyData';
import Metas from '../../components/common/Metas';
import WriterControls from './DetailButton/WriterControls';
import CheerButton from './DetailButton/CheerButton';

const DiyDetail = () => {
  const { id } = useParams(); // useParams 훅을 사용하여 URL에서 id(packageNum) 값을 가져옴
  const endpoint = `/packages/${id}`;
  const { data, loading, error } = useFetchData(endpoint);

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

  // 현재 날짜 가져오기
  const currentDate = new Date();

  // boardingDate와 비교하여 이미 지난 날짜인지 확인
  const isPastDate = new Date(airline.boardingDate) < currentDate;

  return (
    <>
      <Metas title={desc.packageName} />
      <div className={styles.DiyDetail}>
        <div>
          <div className={styles.thumbnail_cheer_box}>
            <div className={styles.diy_thumbnail}>
              <img src={desc.profileImg} alt="썸네일" />
              <p>LEGOLEGO</p>
            </div>
            <div className={styles.cheer_user_box}>
              <div className={styles.date_edit_box}>
                <p>{data.regDate}</p>
                {isWriter && <WriterControls id={id} likedNum={likedNum} />}
              </div>
              <h2>{desc.packageName}</h2>
              <div className={styles.user}>
                <span>{writer.userNickname}</span>
                <AccountCircleIcon />
              </div>
              <h4>응원하기를 눌러 같이 여행 떠나요!</h4>
              <p>응원 수 25개 넘으면 정식 상품으로 레고! 레고!</p>
              <div className={styles.lego_img}>
                <img src="/src/assets/images/lego_yellow.png" />
                <img src="/src/assets/images/lego_blue.png" />
                <img src="/src/assets/images/lego_red.png" />
              </div>
              <div className={styles.like_view_box}>
                <ThumbUpAltIcon />
                <div>{likedNum}</div>
                <VisibilityIcon />
                <div>{data.viewNum}</div>
              </div>
              {isPastDate ? (
                <button className={styles.cheer_button}>응원 만료</button>
              ) : isWriter ? (
                <button className={styles.cheer_button}>응원 받는 중!</button>
              ) : (
                <CheerButton
                  id={id}
                  likedNum={likedNum}
                  isLiked={isLiked}
                  setLikedNum={setLikedNum}
                  setIsLiked={setIsLiked}
                />
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
