import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTE_ARR } from './Routes/route';
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {ROUTE_ARR.map((route, index) => (
              <Route
                path={route.path}
                element={<route.element />}
                key={index}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
