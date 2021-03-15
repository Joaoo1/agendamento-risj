import { growl } from '@crystallize/react-growl';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import Paginate from '../../components/Paginate';

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

  const [totalPages, setTotalPages] = useState(1);

  async function fetchAppointments(page = 1) {
    try {
      setLoadingAppointments(true);
      const response = await api.get(`/concluded_appointments?page=${page}`);
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
    api.get('/count_concluded_appointments').then(
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
        <Paginate onPageClick={handlePageClick} pages={totalPages} />
      </Container>
    </>
  );
};

export default AdminConcludeAppointments;
