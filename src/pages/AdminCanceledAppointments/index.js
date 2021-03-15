import { growl } from '@crystallize/react-growl';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import Paginate from '../../components/Paginate';

import api from '../../services/api';
import {
  Container,
  AppointmentsTable,
  ScheduleLoadingContainer,
  ServicesList,
} from './styles';

const AdminCanceledAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoadingAppointments, setLoadingAppointments] = useState(false);

  const [totalPages, setTotalPages] = useState(1);

  async function fetchAppointments(page = 1) {
    try {
      setLoadingAppointments(true);
      const response = await api.get(`/canceled_appointments?page=${page}`);
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
    api.get('/count_canceled_appointments').then(
      response => {
        setTotalPages(response.data.pages);
      },
      async () => {
        await growl({
          title: 'Erro',
          message: 'Erro ao buscar número de páginas',
          type: 'error',
        });
      }
    );

    fetchAppointments();
  }, []);

  function handlePageClick(page) {
    fetchAppointments(page);
  }

  function renderAppointmentsList() {
    if (isLoadingAppointments) {
      return (
        <ScheduleLoadingContainer>
          <ReactLoading type="spin" color="#403e3e" height={100} width={50} />
        </ScheduleLoadingContainer>
      );
    }

    if (appointments.length === 0) {
      return <p>Nenhum agendamento cancelado foi encontrado</p>;
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
            <th>Cancelado em</th>
            <th>Cancelado por</th>
            <th>Tipo de atendimento</th>
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
              <td>{a.canceledAt}</td>
              <td>{a.canceledBy.name}</td>
              <td>
                <ServicesList>
                  {a.services.map(s => (
                    <li>{s}</li>
                  ))}
                </ServicesList>
              </td>
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
        <Paginate pages={totalPages} onPageClick={handlePageClick} />
      </Container>
    </>
  );
};

export default AdminCanceledAppointments;
