import styles from './Home.module.css';
import DiyCard from './DiyCard/DiyCard';
import Avatar from '../../components/Avatar/Avatar';

const Home = () => {
  return (
    <>
      <section>
        <div>
          <h2>
            내가 만드는 DIY 여행!
            <br /> 지금 바로 여행상품을 만들어 보세요
          </h2>
          <div>
            <input type="text" />
            <button>
              레고레고
              <br />
              여행조립하기
            </button>
          </div>
        </div>
      </section>
      <section>
        <h2>레고러들이 선택한 여행에 참여하기</h2>
      </section>
      <section>
        <h2>방금 올라온 DIY 패키지</h2>
        <DiyCard
          imageUrl="https://picsum.photos/seed/picsum/300/200"
          title="문화재 위주로 다니는 여행"
          user={
            <Avatar
              nickname="test123"
              imageUrl="https://picsum.photos/seed/helloworld/200/100"
            />
          }
        />
      </section>
    </>
  );
};

export default Home;
