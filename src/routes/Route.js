import { Route } from 'react-router-dom';

import DefaultLayout from '../pages/_layouts/default';

const RouteWrapper = ({ component: Component, isPrivate, ...rest }) => {
  if (isPrivate) {
    return <h1>Privado</h1>;
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
