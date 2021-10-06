/* eslint-disable react/jsx-props-no-spreading */
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import DefaultLayout from '../pages/_layouts/default';
import AuthLayout from '../pages/_layouts/auth';
import { isAuthenticated } from '../services/auth';

const propTypes = {
  component: PropTypes.func.isRequired,
  isPrivate: PropTypes.bool,
  title: PropTypes.string,
};

const defaultProps = {
  isPrivate: false,
  title: '',
};

const RouteWrapper = ({ component: Component, isPrivate, title, ...rest }) => {
  if (isPrivate) {
    if (!isAuthenticated()) {
      return <Redirect to="/admin" exact />;
    }

    return (
      <Route
        {...rest}
        render={props => (
          <AuthLayout title={title}>
            <Component {...props} />
          </AuthLayout>
        )}
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

RouteWrapper.propTypes = propTypes;
RouteWrapper.defaultProps = defaultProps;

export default RouteWrapper;
