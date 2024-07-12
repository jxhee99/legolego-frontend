import { useEffect, useState } from "react";
import styles from '../Home.module.css';
import CreateImg1 from '../IntroSection/IntroImage/createImg1.jpg'
import CreateImg2 from '../IntroSection/IntroImage/createImg2.jpg'
import CreateImg3 from '../IntroSection/IntroImage/createImg3.jpg'
import CreateImg4 from '../IntroSection/IntroImage/createImg4.jpg'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Navigate, useNavigate } from 'react-router-dom';

const IntroSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const images = [CreateImg1,CreateImg2,CreateImg3,CreateImg4];
  const navigate = useNavigate();
  
  // 슬라이드
  const slide = () => {
    const length = images.length
    console.log(length);
  }

  useEffect(() => {
    slide();
  },[])

  // prevBtn
  const onclickPrevBtn=(e)=>{
    e.stopPropagation();
    setCurrentPage(currentPage === 0  ? images.length -1 : currentPage -1)
}

  // NextBtn
  const onclickNextBtn=(e)=>{
      e.stopPropagation();
      setCurrentPage(currentPage === images.length -1 ? 0 : currentPage +1)
      console.log(setCurrentPage)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((currentPage) => (currentPage === images.length -1 ? 0 : currentPage +1));
    },10000);
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, [images.length]);


  const onclickP=()=>{
    setCount(count+1)
}

  const onclickM=()=>{
      if (count<=0){
          setCount(0)
      }
      else{
        setCount(count-1) 
      }
      

  }

  useEffect(() => {
      if (currentPage>images.length){
          setCurrentPage(0)
      }
  }, [currentPage, images.length]);

  const handleClick = () => {
    navigate('/diy'); 
  }

  return (
    <section className={styles.IntroSection} style={{ backgroundImage: `url(${images[currentPage]})` }} onClick={handleClick}>
      {/* 슬라이드 이미지 */}
      <div className={styles.slide}>     
          <div className={styles.navigationButtons}>
            <button onClick={onclickPrevBtn}><KeyboardArrowLeftIcon fontSize="large"/></button>
            <button onClick={onclickNextBtn}><KeyboardArrowRightIcon fontSize="large"/></button>
          </div>
      </div>
    </section>
  );
};

export default IntroSection;
