import About from '../pages/About/About';
import Home from '../pages/Home/Home';
import Package from '../pages/Package/Package';
import PackageDetail from '../pages/PackageDetail/PackageDetail';
import Diy from '../pages/Diy/Diy';
import DiyCreate from '../pages/DiyCreate/DiyCreate';
import DiyCreateTouristSpot from '../pages/DiyCreateTouristSpot/DiyCreateTouristSpot';
import DiyCreateAirplane from '../pages/DiyCreateAirplane/DiyCreateAirplane';
import DiyCreateSchedule from '../pages/DiyCreateSchedule/DiyCreateSchedule';
import Review from '../pages/Review/Review';
import MypageProfileSetting from '../pages/MypageProfileSetting/MypageProfileSetting';

export const ROUTE = {
  ABOUT: {
    path: '/about',
    link: '/about',
    element: About,
  },
  HOME: {
    path: '/',
    link: '/',
    element: Home,
  },
  PACKAGE: {
    path: '/package',
    link: '/package',
    element: Package,
  },
  PACKAGE_DETAIL: {
    path: '/package/:id',
    link: '/package/:id',
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
    element: '',
  },
  DIY_CREATE: {
    path: '/diy-create',
    link: '/diy-create',
    element: DiyCreate,
  },
  REVIEW: {
    path: '/review',
    link: '/review',
    element: Review,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);

// DiyCreate Depth
export const ROUTE_DIY_CREATE = {
  DIY_CREATE_TOURIST_SPOT: {
    path: '/diy-create/tourist-spot',
    link: '/diy-create/tourist-spot',
    element: DiyCreateTouristSpot,
  },
  DIY_CREATE_AIRPLANE: {
    path: '/diy-create/airplane',
    link: '/diy-create/airplane',
    element: DiyCreateAirplane,
  },
  DIY_CREATE_SCHEDULE: {
    path: '/diy-create/schedule',
    link: '/diy-create/schedule',
    element: DiyCreateSchedule,
  },
};

export const ROUTE_DIY_CREATE_ARR = Object.values(ROUTE_DIY_CREATE);

// MyPage Depth
export const ROUTE_MY_PAGE = {
  PROFILE_SETTING: {
    path: '/mypage/profile-setting',
    link: '/mypage/profile-setting',
    element: MypageProfileSetting,
  },
  // ORDER_SUMMARY: {
  //   path: '/mypage/order-summary',
  //   link: '/mypage/order-summary',
  //   element: '',
  // },
  // MY_DIY_PACKAGE: {
  //   path: '/mypage/my-diy-package',
  //   link: '/mypage/my-diy-package',
  //   element: '',
  // },
  // SAVED_PACKAGES: {
  //   path: '/mypage/saved-packages',
  //   link: '/mypage/saved-packages',
  //   element: '',
  // },
};

export const ROUTE_MY_PAGE_ARR = Object.values(ROUTE_MY_PAGE);
