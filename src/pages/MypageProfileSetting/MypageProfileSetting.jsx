import styles from './MypageProfileSetting.module.css';
import Input from '../../components/Form/Input/Input';

const MypageProfileSetting = () => {
  return (
    <div className={styles.ProfileSetting}>
      <div className={styles.profile_setting_wrapper}>
        <h3>Edit Profile</h3>
        <div className={styles.profile_box}>
          <div className={styles.profile_image}>
            <img src="https://picsum.photos/200" alt="프로필 이미지" />{' '}
          </div>
          <input type="text" />
          <button>프로필 사진 변경하기</button>
        </div>
        <form>
          <Input id="id" type="text" text="아이디(닉네임)" />
          <Input id="email" type="email" text="이메일" />
          <Input id="tel" type="tel" text="연락처" />
          <button>저장하기</button>
        </form>
      </div>
    </div>
  );
};

export default MypageProfileSetting;
