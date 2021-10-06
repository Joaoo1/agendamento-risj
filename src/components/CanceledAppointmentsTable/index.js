import PropTypes from 'prop-types';

import TableLoading from '../TableLoading';

import { Table, ServicesList } from './styles';

const propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const CanceledAppointmentsTable = ({ appointments, isLoading }) => {
  if (isLoading) {
    return <TableLoading />;
  }

  if (appointments.length === 0) {
    return <p>Nenhum agendamento cancelado foi encontrado</p>;
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
          <th>Cancelado em</th>
          <th>Cancelado por</th>
          <th>Tipo de atendimento</th>
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
            <td>{a.canceledAt}</td>
            <td>{a.canceledBy.name}</td>
            <td>
              <ServicesList>
                {a.services.map(s => (
                  <li key={s}>{s}</li>
                ))}
              </ServicesList>
            </td>
            <td>{a.docNumber}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

CanceledAppointmentsTable.propTypes = propTypes;

export default CanceledAppointmentsTable;
