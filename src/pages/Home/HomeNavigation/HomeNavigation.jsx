// import { useEffect, useState } from "react";
// import styles from '../Home.module.css';
// import CreateImg1 from '../IntroSection/IntroImage/createImg1.jpg';
// import CreateImg2 from '../IntroSection/IntroImage/createImg2.jpg';
// import CreateImg3 from '../IntroSection/IntroImage/createImg3.jpg';
// import CreateImg4 from '../IntroSection/IntroImage/createImg4.jpg';
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import { Navigate, useNavigate } from 'react-router-dom';

// const IntroSection = () => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const images = [CreateImg1,CreateImg2,CreateImg3,CreateImg4];
//   const navigate = useNavigate();
  
//   // 슬라이드
//   const slide = () => {
//     const length = images.length;
//     console.log(length);
//   }

//   useEffect(() => {
//     slide();
//   }, []);

//   // prevBtn
//   const onclickPrevBtn = (e) => {
//     e.stopPropagation();
//     setCurrentPage(currentPage === 0 ? images.length - 1 : currentPage - 1);
//   }

//   // NextBtn
//   const onclickNextBtn = (e) => {
//     e.stopPropagation();
//     setCurrentPage(currentPage === images.length - 1 ? 0 : currentPage + 1);
//     console.log(setCurrentPage);
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentPage((currentPage) => (currentPage === images.length - 1 ? 0 : currentPage + 1));
//     }, 10000);
//     return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
//   }, [images.length]);

//   useEffect(() => {
//     if (currentPage > images.length) {
//       setCurrentPage(0);
//     }
//   }, [currentPage, images.length]);

//   const handleClick = () => {
//     navigate('/diy'); 
//   }

//   // HomeNavigation을 IntroSection 밑으로 이동 및 background-color 변경 로직 추가
//   const HomeNavigation = () => {
//     const handleScrollToSection = (sectionId) => {
//       const section = document.getElementById(sectionId);
//       if (section) {
//         section.scrollIntoView({ behavior: 'smooth' });
//       }
//     };

//     return (
//       <div className={styles.HomeNavigation} style={{ backgroundColor: currentPage % 2 === 0 ? '#f6e5d1' : '#d1e5f6' }}>
//         <ul>
//           <li onClick={() => handleScrollToSection('package-section')}>상품</li>
//           <li onClick={() => handleScrollToSection('diy-section')}>DIY</li>
//           <li onClick={() => handleScrollToSection('review-section')}>여행후기</li>
//         </ul>
//       </div>
//     );
//   };

//   return (
//     <>
//       <section className={styles.IntroSection} style={{ backgroundImage: `url(${images[currentPage]})` }} onClick={handleClick}>
//         {/* 슬라이드 이미지 */}
//         <div className={styles.slide}>     
//           <div className={styles.navigationButtons}>
//             <button onClick={onclickPrevBtn}><KeyboardArrowLeftIcon fontSize="large"/></button>
//             <button onClick={onclickNextBtn}><KeyboardArrowRightIcon fontSize="large"/></button>
//           </div>
//         </div>
//       </section>
//       <HomeNavigation />
//     </>
//   );
// };

// export default IntroSection;
