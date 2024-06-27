import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      // render={(props) => (isLogin() ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
