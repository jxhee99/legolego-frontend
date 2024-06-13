import About from '../pages/About/About';
import Home from '../pages/Home/Home';
import Package from '../pages/Package/Package';

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
  DIY: {
    path: '/diy',
    link: 'diy',
  },
  REVIEW: {
    path: '/review',
    link: '/review',
  },
};

export const ROUTE_ARR = Object.values(ROUTE);
