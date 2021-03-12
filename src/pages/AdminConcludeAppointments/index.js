import { growl } from '@crystallize/react-growl';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

import api from '../../services/api';
import {
  Container,
  AppointmentsTable,
  LoadingContainer,
  ServicesList,
} from './styles';

const AdminConcludeAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoadingAppointments, setLoadingAppointments] = useState(false);

  async function fetchAppointments() {
    try {
      setLoadingAppointments(true);
      const response = await api.get('/concluded_appointments');
      setAppointments(response.data);
    } catch (err) {
      await growl({
        title: 'Erro',
        message: 'Erro ao buscar agendamentos',
        type: 'error',
      });
    } finally {
      setLoadingAppointments(false);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  function renderAppointmentsList() {
    if (isLoadingAppointments) {
      return (
        <LoadingContainer>
          <ReactLoading type="spin" color="#403e3e" height={100} width={50} />
        </LoadingContainer>
      );
    }

    if (appointments.length === 0) {
      return <p>Nenhum agendamento concluído foi encontrado</p>;
    }

    return (
      <>
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
            <tr>
              <td>{a.cpf}</td>
              <td>{a.user.name}</td>
              <td>{a.user.phone}</td>
              <td>{a.user.email}</td>
              <td>{`${a.date} ${a.hour}`}</td>
              <td>
                <ServicesList>
                  {a.services.map(s => (
                    <li>{s}</li>
                  ))}
                </ServicesList>
              </td>
              <td>{a.concludedBy.name}</td>
              <td>{a.docNumber}</td>
            </tr>
          ))}
        </tbody>
      </>
    );
  }

  return (
    <>
      <Container>
        <AppointmentsTable>{renderAppointmentsList()}</AppointmentsTable>
      </Container>
    </>
  );
};

export default AdminConcludeAppointments;
