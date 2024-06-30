// 페이지
import About from '../pages/About/About';
import Home from '../pages/Home/Home';
import Package from '../pages/Package/Package';
import PackageDetail from '../pages/PackageDetail/PackageDetail';
import Diy from '../pages/Diy/Diy';
import TouristSpot from '../pages/DiyCreate//TouristSpot/TouristSpot';
import Airplane from '../pages/DiyCreate/Airplane/Airplane';
import Schedule from '../pages/DiyCreate/Schedule/Schedule';
import DiyForm from '../pages/DiyCreate/DiyForm/DiyForm';
import DiyDetail from '../pages/DiyDetail/DiyDetail';

//마이페이지
import DiyPriceList from '../pages/Mypage/DiyPriceList/DiyPriceList';
import ProfileSetting from '../pages/Mypage/ProfileSetting/ProfileSetting';
import OrderList from '../pages/Order/OrderList';
import OrderDetail from '../pages/Order/OrderDetail';
import DiyPackage from '../pages/Mypage/DiyPackage/DiyPackage';
import SavedPackage from '../pages/Mypage/SavedPackage/SavedPackage';
import LikeDiyPackage from '../pages/Mypage/LikeDiyPackage/LikeDiyPackage';

//관리자
import Admin from '../pages/Admin/Admin';
import AdminListDiy from '../pages/Admin/AdminList/AdminListDiy';
import AdminListDiyPrice from '../pages/Admin/AdminList/AdminListDiyPrice';
import AdminListProduct from '../pages/Admin/AdminList/AdminListProduct';
import AdminLogin from '../pages/AdminLogin/AdminLogin';
import AdminAccount from '../pages/Admin/AdminAccount/AdminAccount';
import PreTrips from '../pages/Admin/PreTrips/PreTrips';
import MembersList from '../pages/Admin/MembersList/MembersList';

//파트너(여행사)
import Partner from '../pages/Partner/Partner';
import PartnerPackageList from '../pages/Partner/PartnerList/PartnerPackageList';
import PartnerPriceList from '../pages/Partner/PartnerList/PartnerPriceList';
import PartnerProfile from '../pages/Partner/PartnerProfile/PartnerProfile';
import PartnerOrders from '../pages/Partner/PartnerOrders/PartnerOrders';

// 아이디/비밀번호 찾기
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import FindEmail from '../pages/FindAccount/FindEmail';
import FindPassword from '../pages/FindAccount/FindPassword';

// 주문 및 결제
import Order from '../pages/Order/Order';
import Payment from '../pages/Payment/Payment';

// 지난여행
import PreTripList from '../pages/PreTrip/PreTripList';
import PreTripDetail from '../pages/PreTripDetail/PreTripDetail';

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
  PRE_TRIP: {
    path: '/pre-trip',
    link: '/pre-trip',
    element: PreTripList,
  },
  FIND_EMAIL: {
    path: '/find-email',
    link: '/find-email',
    element: FindEmail,
  },
  FIND_PASSWORD: {
    path: '/find-password',
    link: '/find-password',
    element: FindPassword,
  },
  RESET_PASSWORD: {
    path: '/reset-password',
    link: '/reset-password',
    element: ResetPassword,
  },
  // ORDER_DETAIL: {
  //   path: 'order-detail',
  //   link: 'order-detail',
  //   element: OrderDetail,
  // },

  ORDER_DETAIL: {
    path: 'order-detail/:orderNum',
    link: 'order-detail/:orderNum',
    element: OrderDetail,
  },
  PRETRIP_DETAIL: {
    path: 'preTrip_detail',
    link: 'preTrip_detail',
    element: PreTripDetail,
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
  DIY_CREATE_PACKAGEFORM: {
    path: '/diy-create?step=diy-form',
    link: '/diy-create?step=diy-form',
    element: DiyForm,
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
  ORDER_SUMMARY: {
    path: '/mypage?tab=order-summary',
    link: '/mypage?tab=order-summary',
    element: OrderList,
  },
  MY_DIY_PACKAGE: {
    path: '/mypage?tab=my-diy-package',
    link: '/mypage?tab=my-diy-package',
    element: DiyPackage,
  },
  LIKE_DIY_PACKAGE: {
    path: '/mypage?tab=like-diy-package',
    link: '/mypage?tab=like-diy-package',
    element: LikeDiyPackage,
  },
  SAVED_PACKAGES: {
    path: '/mypage?tab=saved-packages',
    link: '/mypage?tab=saved-packages',
    element: SavedPackage,
  },
};

export const ROUTE_MY_PAGE_ARR = Object.values(ROUTE_MY_PAGE);

//admin pages
export const ROUTE_ADMIN_LISTS = {
  ADMIN: {
    path: '/admin',
    link: '/admin',
    element: Admin,
  },
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
  ADMIN_PROFILE: {
    path: '/admin/profile',
    link: '/admin/profile',
    element: AdminAccount,
  },
  ADMIN_LISTS_PRE_TRIPS: {
    path: '/admin/lists/pre-trips',
    link: '/admin/lists/pre-trips',
    element: PreTrips,
  },
  ADMIN_LISTS_MEMBERS: {
    path: '/admin/lists/members',
    link: '/admin/lists/members',
    element: MembersList,
  },
};

export const ROUTE_ADMIN_ARR = Object.values(ROUTE_ADMIN_LISTS);

//partner pages
export const ROUTE_PARTNER_LISTS = {
  PARTNER: {
    path: '/partner',
    link: '/partner',
    element: Partner,
  },
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
  PARTNER_PROFILE: {
    path: '/partner/profile',
    link: '/partner/profile',
    element: PartnerProfile,
  },
  PARTNER_OREDERS: {
    path: '/partner/lists/orders',
    link: '/partenr/lists/orders',
    element: PartnerOrders,
  },
};

export const ROUTE_PARTNER_ARR = Object.values(ROUTE_PARTNER_LISTS);

// Order 및 Payment 경로 추가
export const ROUTE_ORDER = {
  ORDER: {
    path: '/order/:productNum',
    link: '/order/:productNum',
    element: Order,
  },
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