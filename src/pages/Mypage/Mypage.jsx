import styles from './Mypage.module.css';
import { useSearchParams } from 'react-router-dom';
import ProfileSetting from './ProfileSetting/ProfileSetting';
import DiyPriceList from './DiyPriceList/DiyPriceList';
import Sidebar from './Sidebar/Sidebar';
import OrderList from '../Order/OrderList';
import DiyPackage from './DiyPackage/DiyPackage';
import SavedPackage from './SavedPackage/SavedPackage';
import Metas from '../../components/common/Metas';
import LikeDiyPackage from './LikeDiyPackage/LikeDiyPackage';

const Mypage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  return (
    <>
      <Metas title="LEGOLEGO — 마이페이지" />
      <div className={styles.Mypage}>
        <Sidebar />
        <div className={styles.mypage_wrapper}>
          {tab === 'profile-setting' && <ProfileSetting />}
          {tab === 'order-summary' && <OrderList />}
          {tab === 'my-diy-prices' && <DiyPriceList />}
          {tab === 'like-diy-package' && <LikeDiyPackage />}
          {tab === 'my-diy-package' && <DiyPackage />}
          {tab === 'saved-packages' && <SavedPackage />}
        </div>
      </div>
    </>
  );
};

export default Mypage;
