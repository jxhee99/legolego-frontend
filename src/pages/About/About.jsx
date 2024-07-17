import React from 'react';
import styles from './About.module.css';
import Metas from '../../components/common/Metas';
import { useEffect, useState } from 'react';
import { SectionsContainer, Section } from 'react-fullpage';
import Process from '../../components/Process/Process';
import aboutImg1 from '../../assets/images/about/lego5.jpg';
import aboutImg2 from '../../assets/images/about/lego6.jpg';
import aboutImg3 from '../../assets/images/about/lego7.jpg';
import aboutImg4 from '../../assets/images/airCity.jpeg';
import HoverCard from '../../components/Card/HoverCard/HoverCard';
import Footer from '../../components/Footer/Footer';

const About = () => {
  // 스크롤 위치 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //about 페이지 내에서 새로고침 시 스크롤 초기화 후 해당 섹션으로 이동
  const [initialActiveSection, setInitialActiveSection] = useState(null);

  const onScroll = (p) => {
    if (initialActiveSection === null) {
      window.scrollTo(0, 0);
      setInitialActiveSection(p.activeSection);
    }
  };

  let options = {
    anchors: ['legolego', 'introduction', 'process', 'links'],
    scrollCallback: onScroll,
  };

  return (
    <div className={styles.About}>
      <Metas title="내가 만드는 패키지 여행" />
      <SectionsContainer
        {...options}
        className={styles.About}
        activeSection={initialActiveSection}
      >
        <Section className={styles.about_top}>
          <div className={styles.about_header}>
            <h1>세상에 하나뿐인 나만의 패키지 여행</h1>
            <h2>LEGO LEGO</h2>
            <p>응원을 받아 정식 상품이 되면 함께 떠나보세요</p>
          </div>
        </Section>

        <Section className={styles.introduction}>
          <div className={styles.intro}>
            <div className={styles.left}>
              <h2>여행의 새로운 패러다임</h2>
              <div className={styles.intro_list}>
                <p>
                  기존의 틀에 박힌 패키지 여행이 지겹다면,
                  <br /> 여러분의 일정으로 만들어가는 DIY 패키지 여행
                  어떠신가요?
                </p>
                <p>
                  내가 계획한 일정대로 여행이 진행된다면 얼마나 즐거울까요!
                  <br /> 여러분의 꿈을 레고레고가 실현시켜드립니다.
                </p>
                <p>
                  지금 당장 나만의 특별한 여행을 계획하고,
                  <br /> 자유와 모험이 가득한 맞춤형 여행을 떠나보세요!
                </p>
              </div>
            </div>
            <div className={styles.right}>
              <img src={aboutImg4} />
            </div>
          </div>
        </Section>

        <Section>
          <div className={styles.steps_container}>
            <Process />
          </div>
        </Section>

        <Section>
          <div className={styles.ourAndFooter_container}>
            <div className={styles.our_container}>
              <HoverCard
                imageSrc={aboutImg1}
                title="Let's Create"
                overlayText="기존의 패키지가 지겹다면"
                overlayTitle="패키지 제작"
                overlayExplain="나만의 DIY 패키지로 떠나기"
                buttonText="view"
                link="/diy-create?step=tourist-spote"
              />
              <HoverCard
                imageSrc={aboutImg2}
                title="Our Package"
                overlayText="정식 상품이 되어 함께 떠날 수 있어요!"
                overlayTitle="패키지 구경"
                overlayExplain="유저가 만든 패키지 보러가기"
                buttonText="view"
                link="/diy"
              />
              <HoverCard
                imageSrc={aboutImg3}
                title="Our Product"
                overlayText="레고와 떠나는 여행을 둘러보세요"
                overlayTitle="정식 상품"
                overlayExplain="빨리 출발하고 싶다면"
                buttonText="view"
                link="/product"
              />
            </div>
            <Footer />
          </div>
        </Section>
      </SectionsContainer>
    </div>
  );
};

export default About;
