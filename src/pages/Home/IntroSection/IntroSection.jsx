import styles from '../Home.module.css';
import CountrySelect from './CountrySelect';
import Button from '@mui/material/Button';

const IntroSection = () => {
  return (
    <section className={styles.IntroSection}>
      <div>
        <h2>
          내가 만드는 DIY 여행!
          <br /> 지금 바로 여행상품을 만들어 보세요
        </h2>
      </div>
    </section>
  );
};

export default IntroSection;
