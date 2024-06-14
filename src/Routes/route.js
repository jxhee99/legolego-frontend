import About from '../pages/About/About';
import Home from '../pages/Home/Home';
import Package from '../pages/Package/Package';
import PackageDetail from '../pages/PackageDetail/PackageDetail';
import Diy from '../pages/Diy/Diy';
import Review from '../pages/Review/Review';

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
    element: Diy,
  },
  REVIEW: {
    path: '/review',
    link: '/review',
    element: Review,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);
