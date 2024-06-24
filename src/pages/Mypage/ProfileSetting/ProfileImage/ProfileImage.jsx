import styles from '../ProfileSetting.module.css';

const ProfileImage = () => {
  return (
    <div className={styles.ProfileImage}>
      <div>
        <img src="https://picsum.photos/200" alt="프로필 이미지" />
      </div>
    </div>
  );
};

export default ProfileImage;
