import { growl } from '@crystallize/react-growl';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import ConfirmModal from '../../components/ConfirmModal';

import LoadingIndicator from '../../components/LoadingIndicator';
import CancelIcon from '../../assets/icons/CancelIcon';
import DoneIcon from '../../assets/icons/DoneIcon';
import api from '../../services/api';
import {
  Container,
  AppointmentsTable,
  ScheduleLoadingContainer,
} from './styles';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoadingAppointments, setLoadingAppointments] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [showConcludeModal, setShowConcludeModal] = useState(false);

  async function fetchAppointments() {
    try {
      setLoadingAppointments(true);
      const response = await api.get('/appointments');
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

  async function handleCloseCancelModal() {
    setShowCancelModal(false);
    setSelectedAppointment({});
  }

  async function handleCloseConcludeModal() {
    setShowConcludeModal(false);
    setSelectedAppointment({});
  }

  async function handleConcludeAppointmentClick(a) {
    setSelectedAppointment(a);
    setShowConcludeModal(true);
  }

  async function handleCanceAppointmentClick(a) {
    setSelectedAppointment(a);
    setShowCancelModal(true);
  }

  async function handleCancelAppointment() {
    try {
      setLoading(true);
      await api.put(`/cancel_appointment/${selectedAppointment.id}`);
      await growl({
        title: 'Agendamento cancelado',
        message: 'O agendamento foi cancelado com sucesso',
        type: 'info',
      });
      fetchAppointments();
    } catch (err) {
      if (err.response) {
        await growl({
          title: 'Erro',
          message: err.response.data.error,
          type: 'error',
        });
      } else {
        await growl({
          title: 'Erro',
          message: 'Erro ao cancelar agendamento',
          type: 'error',
        });
      }
    } finally {
      handleCloseCancelModal();
      setLoading(false);
    }
  }

  async function handleConcludeAppointment() {
    try {
      setLoading(true);
      await api.put(`/conclude_appointment/${selectedAppointment.id}`);
      await growl({
        title: 'Agendamento concluído',
        message: 'O agendamento foi concluído com sucesso',
        type: 'info',
      });
      fetchAppointments();
    } catch (err) {
      if (err.response) {
        await growl({
          title: 'Erro',
          message: err.response.data.error,
          type: 'error',
        });
      } else {
        await growl({
          title: 'Erro',
          message: 'Erro ao alterar agendamento',
          type: 'error',
        });
      }
    } finally {
      handleCloseConcludeModal();
      setLoading(false);
    }
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
      return <p>Nenhum agendamento ativo encontrado</p>;
    }

    return (
      <>
        {isLoading && <LoadingIndicator />}
        <thead>
          <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Dia</th>
            <th>Hora</th>
            <th colSpan="2">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr>
              <td>{a.cpf}</td>
              <td>{a.user.name}</td>
              <td>{a.user.phone}</td>
              <td>{a.user.email}</td>
              <td>{a.date}</td>
              <td>{a.hour}</td>
              <td>{a.status}</td>
              <td className="icons">
                <CancelIcon
                  title="Cancelar agendamento"
                  onClick={() => handleCanceAppointmentClick(a)}
                />
                <DoneIcon
                  title="Agendamento concluído"
                  onClick={() => handleConcludeAppointmentClick(a)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  }

  return (
    <>
      <ConfirmModal
        show={showConcludeModal}
        handleClose={handleCloseConcludeModal}
        handleConfirm={handleConcludeAppointment}
        message={`O agendamento do dia ${selectedAppointment.date} as ${selectedAppointment.hour} será concluído.`}
        title="Concluir agendamento"
        confirmButtonColor="#6cb1c4"
      />

      <ConfirmModal
        show={showCancelModal}
        handleClose={handleCloseCancelModal}
        handleConfirm={handleCancelAppointment}
        message={`Deseja realmente excluir o cancelar o agendamento do dia ${selectedAppointment.date} ás ${selectedAppointment.hour}?`}
        title="Cancelar agendamento"
      />
      <Container>
        <AppointmentsTable>{renderAppointmentsList()}</AppointmentsTable>
      </Container>
    </>
  );
};

export default AdminAppointments;
