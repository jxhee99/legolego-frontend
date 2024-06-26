import About from '../pages/About/About';
import Home from '../pages/Home/Home';
import Package from '../pages/Package/Package';
import PackageDetail from '../pages/PackageDetail/PackageDetail';
import Diy from '../pages/Diy/Diy';
import TouristSpot from '../pages/DiyCreate//TouristSpot/TouristSpot';
import Airplane from '../pages/DiyCreate/Airplane/Airplane';
import Schedule from '../pages/DiyCreate/Schedule/Schedule';
import Review from '../pages/Review/Review';
import DiyDetail from '../pages/DiyDetail/DiyDetail';

//마이페이지
import DiyPriceList from '../pages/Mypage/DiyPriceList/DiyPriceList';
import ProfileSetting from '../pages/Mypage/ProfileSetting/ProfileSetting';

//관리자
import Admin from '../pages/Admin/Admin';
import AdminListDiy from '../pages/Admin/AdminList/AdminListDiy';
import AdminListDiyPrice from '../pages/Admin/AdminList/AdminListDiyPrice';
import AdminListProduct from '../pages/Admin/AdminList/AdminListProduct';
import AdminLogin from '../pages/AdminLogin/AdminLogin';

//파트너(여행사)
import Partner from '../pages/Partner/Partner';
import PartnerPackageList from '../pages/Partner/PartnerList/PartnerPackageList';
import PartnerPriceList from '../pages/Partner/PartnerList/PartnerPriceList';

// 아이디/비밀번호 찾기
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import FindAccount from '../pages/FindAccount/FindAccount';

// 주문 및 결제
import Order from '../pages/Order/Order';
import Payment from '../pages/Payment/Payment';

import { element } from 'prop-types';

export const ROUTE = {
  ABOUT: {
    path: '/',
    link: '/',
    element: About,
  },
  HOME: {
    path: '/home',
    link: '/home',
    element: Home,
  },
  PACKAGE: {
    path: '/package-product',
    link: '/package-product',
    element: Package,
  },
  PACKAGE_DETAIL: {
    path: '/package-product/:id',
    link: '/package-product/:id',
    element: PackageDetail,
  },
  DIY: {
    path: '/diy',
    link: '/diy',
    element: Diy,
  },
  DIY_DETAIL: {
    path: '/diy/:id',
    link: '/diy/:id',
    element: DiyDetail,
  },
  REVIEW: {
    path: '/review',
    link: '/review',
    element: Review,
  },
  FIND_ACCOUNT: {
    path: 'find-account',
    link: 'find-account',
    element: FindAccount,
  },
  RESET_PASSWORD: {
    path: 'reset-password',
    link: 'reset-password',
    element: ResetPassword,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);

// DiyCreate Tabs
export const ROUTE_DIY_CREATE = {
  DIY_CREATE_TOURIST_SPOT: {
    path: '/diy-create?step=tourist-spot',
    link: '/diy-create?step=tourist-spot',
    element: TouristSpot,
  },
  DIY_CREATE_AIRPLANE: {
    path: '/diy-create?step=airplane',
    link: '/diy-create?step=airplane',
    element: Airplane,
  },
  DIY_CREATE_SCHEDULE: {
    path: '/diy-create?step=schedule',
    link: '/diy-create?step=schedule',
    element: Schedule,
  },
};

export const ROUTE_DIY_CREATE_ARR = Object.values(ROUTE_DIY_CREATE);

// MyPage Tabs
export const ROUTE_MY_PAGE = {
  PROFILE_SETTING: {
    path: '/mypage?tab=profile-setting',
    link: '/mypage?tab=profile-setting',
    element: ProfileSetting,
  },

  DIY_PRICES: {
    path: '/mypage?tab=my-diy-prices',
    link: '/mypage?tab=my-diy-prices',
    element: DiyPriceList,
  },
  // ORDER_SUMMARY: {
  //   path: '/mypage?tab=order-summary',
  //   link: '/mypage?tab=order-summary',
  //   element: '',
  // },
  // MY_DIY_PACKAGE: {
  //   path: '/mypage?tab=my-diy-package',
  //   link: '/mypage?tab=my-diy-package',
  //   element: '',
  // },
  // SAVED_PACKAGES: {
  //   path: '/mypage?tab=saved-packages',
  //   link: '/mypage?tab=saved-packages',
  //   element: '',
  // },
};

export const ROUTE_MY_PAGE_ARR = Object.values(ROUTE_MY_PAGE);

//admin pages
export const ROUTE_ADMIN = {
  ADMIN: {
    path: '/admin',
    link: '/admin',
    element: Admin,
  },
};

export const ROUTE_ADMIN_LISTS = {
  ADMIN_LISTS_DIY: {
    path: '/admin/lists/diy-packages',
    link: '/admin/lists/diy-packages',
    element: AdminListDiy,
  },
  ADMIN_LISTS_LIKESOVER: {
    path: '/admin/lists/diy-prices',
    link: '/admin/lists/diy-prices',
    element: AdminListDiyPrice,
  },

  ADMIN_LISTS_PRODUCT: {
    path: '/admin/lists/products',
    link: '/admin/lists/products',
    element: AdminListProduct,
  },
  ADMIN_LOGIN: {
    path: '/admin/login',
    link: '/admin/login',
    element: AdminLogin,
  },
};

export const ROUTE_ADMIN_ARR = Object.values(ROUTE_ADMIN_LISTS);

//partner pages
export const ROUTE_PARTNER = {
  PARTNER: {
    path: '/partner',
    link: '/partner',
    element: Partner,
  },
};

export const ROUTE_PARTNER_LISTS = {
  PARTNER_LISTS_PACKAGES: {
    path: '/partner/lists/packages',
    link: '/partenr/lists/packages',
    element: PartnerPackageList,
  },
  PARTNER_LISTS_PRICES: {
    path: '/partner/lists/prices',
    link: '/partner/lists/prices',
    element: PartnerPriceList,
  },
};

export const ROUTE_PARTNER_ARR = Object.values(ROUTE_PARTNER_LISTS);


// Order 및 Payment 경로 추가
export const ROUTE_ORDER = {
  ORDER : {
    path: '/order/:productNum',  
    link: '/order/:productNum',
    element: Order,
  }
};

export const ROUTE_ORDER_ARR = Object.values(ROUTE_ORDER); 

export const ROUTE_PAYMENT = {
  PAYMENT: {
    path: '/payment',
    link: '/payment',
    element: Payment,
  },
};

export const ROUTE_PAYMENT_ARR = Object.values(ROUTE_PAYMENT); 
