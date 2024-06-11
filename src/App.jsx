import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTE_ARR } from './Routes/route';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          {ROUTE_ARR.map((route, index) => (
            <Route path={route.path} element={<route.element />} key={index} />
          ))}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
