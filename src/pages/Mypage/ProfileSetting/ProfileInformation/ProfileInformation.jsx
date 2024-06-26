import styles from '../ProfileSetting.module.css';
import Input from '../../../../components/Form/Input/Input';

const ProfileInformation = () => {
  return (
    <form className={`${styles.ProfileInformation}`}>
      <Input id="id" type="text" text="아이디(닉네임)" />
      <Input id="email" type="email" text="이메일" />
      <Input id="tel" type="text" text="연락처" />
    </form>
  );
};

export default ProfileInformation;
