import styles from './Partner.module.css';
import Input from '../../../components/Form/Input/Input';

const PartnerProfile = () => {
  return (
    <div className={styles.formContainer}>
      <h2>프로필 관리</h2>
      <form>
        <Input id="name" text="이름" type="text" className={styles.input} />
        <Input id="email" text="이메일" type="email" className={styles.input} />
        <Input
          id="password"
          text="기존 비밀번호"
          type="password"
          className={styles.input}
        />
        <Input
          id="newPassword"
          text="새로운 비밀번호"
          type="password"
          className={styles.input}
        />
        <Input
          id="checkPassword"
          text="비밀번호 재확인"
          type="password"
          className={styles.input}
        />
        <button className={styles.button}>비밀번호 변경</button>
      </form>
    </div>
  );
};

export default PartnerProfile;
