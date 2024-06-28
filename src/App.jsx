import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import AdminLogin from './pages/AdminLogin/AdminLogin';
import Partner from './pages/Partner/Partner';
import LogIn from './components/Header/Authentication/LogIn';
import Home from './pages/Home/Home';
import { AuthContext } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const { isAuthenticated, role } = useContext(AuthContext);

  return (
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

        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin" element={<Admin />}>
            {ROUTE_ADMIN_ARR.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['PARTNER']} />}>
        <Route path="/partner" element={<Partner />}>
          {ROUTE_PARTNER_ARR.map((route) => (
            <Route
              path={route.path}
              element={<route.element />}
              key={route.path}
            />
          ))}
          </Route>
        </Route>
        
        <Route path="*" element={<Navigate to="/home" />} />

        </Routes>
      
    
  );
};

export default App;
