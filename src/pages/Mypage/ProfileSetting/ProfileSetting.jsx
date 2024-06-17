import styles from './ProfileSetting.module.css';
import ProfileImage from './ProfileImage/ProfileImage';
import ProfileInformation from './ProfileInformation/ProfileInformation';

const MypageProfileSetting = () => {
  return (
    <div className={styles.ProfileSetting}>
      <h3>Edit Profile</h3>
      <div className={styles.wrapper}>
        <ProfileImage />
        <ProfileInformation />
      </div>
    </div>
  );
};

export default MypageProfileSetting;
