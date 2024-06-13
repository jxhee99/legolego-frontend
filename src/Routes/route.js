import About from '../pages/About/About';
import Home from '../pages/Home/Home';

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
    element: Home,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);
