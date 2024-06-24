import styles from './PartnerSignUp.module.css';
import Input from '../../components/Form/Input/Input';

const PartnerSignUp = () => {
  return (
    <div className={styles.PartnerSignUp}>
      <h2>파트너 회원가입</h2>
      <form>
        <Input id="email" text="이메일" type="email" />
        <Input id="password" text="비밀번호" type="password" />
        <Input id="text" text="회사명" type="text" />
        <Input id="mobile" text="휴대폰번호" type="mobile" />
      </form>
    </div>
  );
};

export default PartnerSignUp;
