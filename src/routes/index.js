import { Switch, Route } from 'react-router-dom';

import RouteWrapper from './Route';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ScheduleAppointment from '../pages/ScheduleAppointment';
import UserAppointments from '../pages/UserAppointments';
import AdminAppointments from '../pages/Admin/Appointments';
import AdminSchedule from '../pages/Admin/Schedule';
import AdminCanceledAppointments from '../pages/Admin/CanceledAppointments';
import AdminConcludeAppointments from '../pages/Admin/ConcludeAppointments';
import AdminHolidays from '../pages/Admin/Holidays';

const Routes = () => (
  <Switch>
    <RouteWrapper path="/" exact component={Home} />
    <RouteWrapper path="/agendar" component={ScheduleAppointment} />
    <RouteWrapper path="/agendamentos" component={UserAppointments} />
    <Route path="/admin" exact component={Login} />
    <RouteWrapper
      path="/admin/appointments"
      component={AdminAppointments}
      isPrivate
      title="Agendamentos"
    />
    <RouteWrapper
      path="/admin/schedule"
      component={AdminSchedule}
      isPrivate
      title="Horários disponíveis"
    />
    <RouteWrapper
      path="/admin/canceled-appointments"
      component={AdminCanceledAppointments}
      isPrivate
      title="Agendamentos cancelados"
    />
    <RouteWrapper
      path="/admin/conclude-appointments"
      component={AdminConcludeAppointments}
      isPrivate
      title="Agendamentos concluídos"
    />
    <RouteWrapper
      path="/admin/holidays"
      component={AdminHolidays}
      isPrivate
      title="Feriados"
    />
  </Switch>
);

export default Routes;
