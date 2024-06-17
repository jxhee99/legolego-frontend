import styles from '../ProfileSetting.module.css';

const ProfileImage = () => {
  return (
    <div className={styles.ProfileImage}>
      <div>
        <img src="https://picsum.photos/200" alt="프로필 이미지" />
      </div>
      <p>아이디</p>
      <button>프로필 사진 변경하기</button>
    </div>
  );
};

export default ProfileImage;
