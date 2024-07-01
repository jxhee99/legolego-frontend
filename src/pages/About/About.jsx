import styles from './About.module.css';
import { Link } from 'react-router-dom';
import Metas from '../../components/common/Metas';
import { SectionsContainer, Section } from 'react-fullpage';

const About = () => {
  let options = {
    anchors: ['legolego', 'links'],
  };

  return (
    <>
      <Metas title="내가 만드는 패키지 여행" />
      <SectionsContainer {...options} className={styles.About}>
        <Section className={styles.about_top}>
          <div className={styles.about_intro}>
            <p>응원을 많이 받아 정식 상품이 되면 함께 떠날 수 있어요!</p>
          </div>
          <div className={styles.about_make_diy}>
            <div className={styles.diy_intro}>
              <h2>
                레고레고와 함께
                <br />
                나만의 여행을 <br />
                만들어보세요!
              </h2>
              <Link to="/home">
                <button className={styles.make_lego}>레고레고 보러가기!</button>
              </Link>
              <button
                data-animation-scroll="true"
                data-target="#scrollhere"
                className={styles.join_lego}
              >
                다른 사람이 만든 여행에 참여하시겠어요?
              </button>
            </div>
            <div className={styles.go_picture}>
              <img
                src="https://images.unsplash.com/photo-1668961197427-c82f80bc63a2?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="여행 이미지"
              />
            </div>
          </div>
        </Section>

        <Section>
          <div className={styles.about_bottom} id="scrollhere">
            <div className={styles.about_package}>
              <div className={styles.about_package_intro}>
                <p>
                  빨리 출발하고 싶다면 ! <br /> 패키지 상품을 이용해 당장
                  떠나보세요
                </p>
              </div>
              <div className={styles.about_package_button}>
                <Link to="/package-product">
                  <button className={styles.package_lego}>
                    패키지 상품 보러 레고~
                  </button>
                </Link>
              </div>
            </div>
            <div className={styles.about_like}>
              <div className={styles.about_like_button}>
                <Link to="/diy">
                  <button className={styles.like_lego}>응원하러 레고~</button>
                </Link>
              </div>
              <div className={styles.about_like_intro}>
                <p>
                  다른사람이 만든 패키지를 응원하면
                  <br />
                  정식 상품이 되어 함께 떠날 수 있어요!
                </p>
              </div>
            </div>
          </div>
        </Section>
      </SectionsContainer>
    </>
  );
};

export default About;
