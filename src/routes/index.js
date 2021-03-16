import { Switch, Route } from 'react-router-dom';

import RouteWrapper from './Route';
import Home from '../pages/Home';
import Appointment from '../pages/Appointment';
import ListAppointments from '../pages/ListAppointments';
import AdminAppointments from '../pages/AdminAppointments';
import AdminSchedule from '../pages/AdminSchedule';
import AdminLogin from '../pages/AdminLogin';
import AdminCanceledAppointments from '../pages/AdminCanceledAppointments';
import AdminConcludeAppointments from '../pages/AdminConcludeAppointments';
import AdminHolidays from '../pages/AdminHolidays';

const Routes = () => (
  <Switch>
    <RouteWrapper path="/" exact component={Home} />
    <RouteWrapper path="/agendamento" component={Appointment} />
    <RouteWrapper path="/agendamentos_feitos" component={ListAppointments} />
    <Route path="/admin" component={AdminLogin} />
    <RouteWrapper
      path="/admin_appointments"
      component={AdminAppointments}
      isPrivate
      title="Agendamentos"
    />
    <RouteWrapper
      path="/admin_available"
      component={AdminSchedule}
      isPrivate
      title="Horários disponíveis"
    />
    <RouteWrapper
      path="/admin_canceled"
      component={AdminCanceledAppointments}
      isPrivate
      title="Agendamentos cancelados"
    />
    <RouteWrapper
      path="/admin_conclude"
      component={AdminConcludeAppointments}
      isPrivate
      title="Agendamentos concluídos"
    />
    <RouteWrapper
      path="/admin_holidays"
      component={AdminHolidays}
      isPrivate
      title="Feriados"
    />
  </Switch>
);

export default Routes;
