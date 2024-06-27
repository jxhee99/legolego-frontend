import Metas from '../../components/common/Metas';
import DiySection from './DiySection/DiySection';
import IntroSection from './IntroSection/IntroSection';
import PackageSection from './PackageSection/PackageSection';

const Home = () => {
  return (
    <>
      <Metas title="LEGOLEGO — 내가 만드는 패키지 여행" />
      <IntroSection />
      <PackageSection />
      <DiySection />
    </>
  );
};

export default Home;
