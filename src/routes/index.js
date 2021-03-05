import { Switch } from 'react-router-dom';

import RouteWrapper from './Route';
import Home from '../pages/Home';
import Appointment from '../pages/Appointment';
import ListAppointments from '../pages/ListAppointments';

const Routes = () => (
  <Switch>
    <RouteWrapper path="/" exact component={Home} />
    <RouteWrapper path="/agendamento" component={Appointment} />
    <RouteWrapper path="/agendamentos_feitos" component={ListAppointments} />
  </Switch>
);

export default Routes;
