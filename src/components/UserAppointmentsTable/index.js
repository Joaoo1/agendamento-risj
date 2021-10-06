import PropTypes from 'prop-types';

import { Table, CancelButton } from './styles';

const propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
};

const UserAppointmentsTable = ({ appointments, onCancelButtonClick }) => (
  <Table>
    <thead>
      <tr>
        {window.innerWidth > 600 && <th>CPF</th>}
        <th>Dia</th>
        <th>Hora</th>
        <th colSpan="2">Status</th>
      </tr>
    </thead>
    <tbody>
      {appointments.map(a => (
        <tr key={a.id}>
          {window.innerWidth > 600 && <td>{a.cpf}</td>}
          <td>{a.date}</td>
          <td>{a.hour}</td>
          <td>{a.status}</td>
          <td>
            <CancelButton onClick={() => onCancelButtonClick(a)}>
              Cancelar agendamento
            </CancelButton>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

UserAppointmentsTable.propTypes = propTypes;

export default UserAppointmentsTable;
