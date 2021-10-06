import PropTypes from 'prop-types';

import CancelIcon from '../../assets/icons/CancelIcon';
import DoneIcon from '../../assets/icons/DoneIcon';
import TableLoading from '../TableLoading';

import { Table, ServicesList, IconsContainer } from './styles';

const propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const AppointmentsTable = ({ appointments, onCancel, onDone, isLoading }) => {
  if (isLoading) {
    return <TableLoading />;
  }

  if (appointments.length === 0) {
    return <p>Nenhum agendamento ativo encontrado</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>CPF</th>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Email</th>
          <th>Dia/Hora</th>
          <th>Tipo de atendimento</th>
          <th>Nº guia/pedido</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {appointments.map(appointment => (
          <tr key={appointment}>
            <td>{appointment.cpf}</td>
            <td>{appointment.user.name}</td>
            <td>{appointment.user.phone}</td>
            <td>{appointment.user.email}</td>
            <td>{`${appointment.date} ${appointment.hour}`}</td>
            <td>
              <ServicesList>
                {appointment.services.map(s => (
                  <li key={s}>{s}</li>
                ))}
              </ServicesList>
            </td>
            <td>{appointment.docNumber}</td>
            <IconsContainer>
              <CancelIcon
                title="Cancelar agendamento"
                onClick={() => onCancel(appointment)}
              />
              <DoneIcon
                title="Agendamento concluído"
                onClick={() => onDone(appointment)}
              />
            </IconsContainer>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

AppointmentsTable.propTypes = propTypes;

export default AppointmentsTable;
