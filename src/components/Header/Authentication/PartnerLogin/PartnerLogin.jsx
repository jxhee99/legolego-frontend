import styles from './PartnerLogin.module.css';
import Input from '../../components/Form/Input/Input';

const PartnerLogin = () => {
  return (
    <div className={styles.PartnerLogin}>
      <h2>파트너 로그인</h2>
      <form>
        <Input id="email" text="이메일" type="email" />
        <Input id="password" text="비밀번호" type="password" />
        <Input id="text" text="회사명" type="text" />
        <Input id="mobile" text="휴대폰번호" type="mobile" />
        <button>로그인</button>
      </form>
    </div>
  );
};

export default PartnerLogin;
