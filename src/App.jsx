import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  ROUTE_ARR,
  ROUTE_DIY_CREATE_ARR,
  ROUTE_DIY_EDIT_ARR,
  ROUTE_MY_PAGE_ARR,
  ROUTE_ADMIN_ARR,
  ROUTE_PARTNER_ARR,
  ROUTE_ORDER_ARR,
  ROUTE_PAYMENT_ARR,
} from './Routes/route';
import Layout from './components/Layout/Layout';
import DiyCreate from './pages/DiyCreate/DiyCreate';
import DiyEdit from './pages/DiyEdit/DiyEdit';
import Mypage from './pages/Mypage/Mypage';
import AdminMenu from './pages/Admin/AdminMenu';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import PartnerMenu from './pages/Partner/PartnerMenu';
import Order from './pages/Order/Order';
import Payment from './pages/Payment/Payment';
import NotFound from './pages/NotFound/NotFound';
import LogIn from './components/Header/Authentication/LogIn';
import Home from './pages/Home/Home';
import { AuthContext } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import FindEmail from './pages/FindAccount/FindEmail';
import FindPassword from './pages/FindAccount/FindPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import OrderList from './pages/Order/OrderList';
import EmailVerification from './components/Header/Authentication/EmailVerification';
import Board from './pages/Board/Board';
import PostForm from './pages/Board/Post/PostForm';
import PostDetail from './pages/Board/Post/PostDetail';

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
        <Route path="/diy-edit/:id" element={<DiyEdit />}>
          {ROUTE_DIY_EDIT_ARR.map((route) => (
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
      <Route path="/find-email" element={<FindEmail />} />
      <Route path="/find-password" element={<FindPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/auth/verify-email" element={<EmailVerification />} />
      <Route path="/board" element={<Board />} />
      <Route path="/create-post" element={<PostForm />} />
      <Route path="/posts/:postNum" element={<PostDetail />} />

      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route element={<AdminMenu />}>
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
        <Route element={<PartnerMenu />}>
          {ROUTE_PARTNER_ARR.map((route) => (
            <Route
              path={route.path}
              element={<route.element />}
              key={route.path}
            />
          ))}
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
        <Route path="/order" element={<Order />}>
          {ROUTE_ORDER_ARR.map((route) => (
            <Route
              path={route.path}
              element={<route.element />}
              key={route.path}
            />
          ))}
        </Route>
      </Route>
      <Route path="/payment" element={<Payment />}>
        {ROUTE_PAYMENT_ARR.map((route) => (
          <Route
            path={route.path}
            element={<route.element />}
            key={route.path}
          />
        ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
