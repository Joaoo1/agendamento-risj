import { Redirect, Route } from 'react-router-dom';

import DefaultLayout from '../pages/_layouts/default';
import AuthLayout from '../pages/_layouts/auth';
import { isAuthenticated } from '../services/auth';

const RouteWrapper = ({ component: Component, isPrivate, title, ...rest }) => {
  if (isPrivate) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() ? (
            <AuthLayout title={title}>
              <Component {...props} />
            </AuthLayout>
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }

  return (
    <Route
      {...rest}
      render={props => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
    />
  );
};

export default RouteWrapper;
