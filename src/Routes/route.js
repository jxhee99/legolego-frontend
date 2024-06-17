import About from '../pages/About/About';
import Home from '../pages/Home/Home';
import Package from '../pages/Package/Package';
import PackageDetail from '../pages/PackageDetail/PackageDetail';
import Diy from '../pages/Diy/Diy';
import DiyCreate from '../pages/DiyCreate/DiyCreate';
import TouristSpot from '../pages/DiyCreate//TouristSpot/TouristSpot';
import Airplane from '../pages/DiyCreate/Airplane/Airplane';
import Schedule from '../pages/DiyCreate/Schedule/Schedule';
import Review from '../pages/Review/Review';

import ProfileSetting from '../pages/Mypage/ProfileSetting/ProfileSetting';
import DiyDetail from '../pages/DiyDetail/DiyDetail';

import Admin from '../pages/Admin/Admin';
import AdminListDiy from "../pages/Admin/AdminList/AdminListDiy";
import AdminListLikesOver from '../pages/Admin/AdminList/AdminListLikesOver';


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
}

export const ROUTE_ADMIN_LISTS = {

  ADMIN_LISTS_DIY: {
    path: '/admin/lists/diy-packages',
    link: '/admin/lists/diy-packages',
    element: AdminListDiy,
  },
  ADMIN_LISTS_LIKESOVER: {
    path: '/admin/lists/likes-over',
    link: '/admin/lists/likes-over',
    element: AdminListLikesOver,
  },
}
export const ROUTE_ADMIN_ARR = Object.values(ROUTE_ADMIN_LISTS);

