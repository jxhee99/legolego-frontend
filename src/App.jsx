import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTE_ARR } from './Routes/route';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {ROUTE_ARR.map((route, index) => (
            <Route path={route.path} element={<route.element />} key={index} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
