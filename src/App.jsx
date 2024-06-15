import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTE_ARR, ROUTE_DIY_CREATE_ARR } from './Routes/route';
import Layout from './components/Layout/Layout';
import DiyCreate from './pages/DiyCreate/DiyCreate';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
