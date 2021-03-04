import { Switch } from 'react-router-dom';

import Home from '../pages/Home';
import RouteWrapper from './Route';

const Routes = () => (
  <Switch>
    <RouteWrapper path="/" exact component={Home} />
    <RouteWrapper path="/agendar" component={Home} />
  </Switch>
);

export default Routes;
