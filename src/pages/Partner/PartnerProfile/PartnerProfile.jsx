import styles from './PartnerProfile.module.css';
import Input from '../../../components/Form/Input/Input';

const PartnerProfile = () => {
  return (
    <div className={styles.formContainer}>
      <h2>프로필 관리</h2>
      <form>
        <Input id="name" text="이름" type="text" />
        <Input id="email" text="이메일" type="email" />
        <Input id="partner" text="회사명" type="text" />
        <Input id="password" text="기존 비밀번호" type="password" />
        <Input id="newPassword" text="새로운 비밀번호" type="password" />
        <Input id="checkPassword" text="비밀번호 재확인" type="password" />
        <button className={styles.button}>비밀번호 변경</button>
      </form>
    </div>
  );
};

export default PartnerProfile;
