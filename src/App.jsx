import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ROUTE_ARR,
  ROUTE_DIY_CREATE_ARR,
  ROUTE_MY_PAGE_ARR,
  ROUTE_ADMIN_ARR,
  ROUTE_PARTNER_ARR,
} from './Routes/route';
import Layout from './components/Layout/Layout';
import DiyCreate from './pages/DiyCreate/DiyCreate';
import Mypage from './pages/Mypage/Mypage';
import Admin from './pages/Admin/Admin';
import Partner from './pages/Partner/Partner';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {ROUTE_ARR.map((route) => (
            <Route
              path={route.path}
              element={<route.element />}
              key={route.path}
            />
          ))}
          <Route path="/diy-create" element={<DiyCreate />}>
            {ROUTE_DIY_CREATE_ARR.map((route) => (
              <Route
                path={route.path}
                element={<route.element />}
                key={route.path}
              />
            ))}
          </Route>
          <Route path="/mypage" element={<Mypage />}>
            {ROUTE_MY_PAGE_ARR.map((route) => (
              <Route
                path={route.path}
                element={<route.element />}
                key={route.path}
              />
            ))}
          </Route>
        </Route>
        <Route path="/admin" element={<Admin />}>
          {ROUTE_ADMIN_ARR.map((route) => (
            <Route
              path={route.path}
              element={<route.element />}
              key={route.path}
            />
          ))}
        </Route>
        <Route path="/partner" element={<Partner />}>
          {ROUTE_PARTNER_ARR.map((route) => (
            <Route
              path={route.path}
              element={<route.element />}
              key={route.path}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
