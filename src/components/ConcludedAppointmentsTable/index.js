import PropTypes from 'prop-types';

import TableLoading from '../TableLoading';
import { Table, ServicesList } from './styles';

const propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const ConcludedAppointmentsTable = ({ appointments, isLoading }) => {
  if (isLoading) {
    return <TableLoading />;
  }

  if (appointments.length === 0) {
    return <p>Nenhum agendamento concluído foi encontrado</p>;
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
          <th>Atendido por</th>
          <th>Nº guia/pedido</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map(a => (
          <tr key={a.id}>
            <td>{a.cpf}</td>
            <td>{a.user.name}</td>
            <td>{a.user.phone}</td>
            <td>{a.user.email}</td>
            <td>{`${a.date} ${a.hour}`}</td>
            <td>
              <ServicesList>
                {a.services.map(s => (
                  <li key={s}>{s}</li>
                ))}
              </ServicesList>
            </td>
            <td>{a.concludedBy.name}</td>
            <td>{a.docNumber}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

ConcludedAppointmentsTable.propTypes = propTypes;

export default ConcludedAppointmentsTable;
