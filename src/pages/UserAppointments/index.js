import { useState } from 'react';

import api from '../../services/api';
import CancelModal from '../../components/ConfirmModal';
import LoadingIndicator from '../../components/LoadingIndicator';
import UserAppointmentsTable from '../../components/UserAppointmentsTable';
import UserAppointmentsSearch from '../../components/UserAppointmentsSearch';
import UserAppointmentsFooter from '../../components/UserAppointmentsFooter';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/Notification';

import { Container, Divider } from './styles';

const UserAppointments = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ day: '', hour: '' });
  const [appointments, setAppointments] = useState([]);
  const [CPF, setCPF] = useState('');
  const [isLoading, setLoading] = useState(false);

  function handleCloseModal() {
    setShowCancelModal(false);
  }

  function handleOpenCancelModal(appointment) {
    setModalInfo({
      day: appointment.date,
      hour: appointment.hour,
      id: appointment.id,
    });
    setShowCancelModal(true);
  }

  async function searchAppointments() {
    try {
      setLoading(true);
      const response = await api.get(`/user_appointments/${CPF}`);
      setAppointments(response.data);
    } catch (err) {
      showErrorNotification({
        err,
        defaultMessage: 'Erro ao buscar agendamentos',
      });
    } finally {
      setLoading(false);
    }
  }

  async function cancelAppointment() {
    try {
      setLoading(true);
      await api.put(`/cancel_appointment/${modalInfo.id}`);
      searchAppointments();
      showSuccessNotification({
        title: 'Sucesso',
        message: 'Agendamento cancelado com sucesso',
      });
    } catch (err) {
      showErrorNotification({
        err,
        defaultMessage: 'Ocorreu um erro ao cancelar agendamento',
      });
    } finally {
      setModalInfo({ day: '', hour: '', id: '' });
      setLoading(false);
      handleCloseModal();
    }
  }

  function handleConfirmCancel() {
    cancelAppointment();
  }

  async function handleSearchButtonClick() {
    if (CPF.length < 14) {
      showErrorNotification({
        defaultMessage: 'CPF Inválido',
      });
      return;
    }

    searchAppointments();
  }

  function handleSearchInputFinished(cpf) {
    setCPF(cpf);
  }

  return (
    <>
      {isLoading && <LoadingIndicator />}

      <CancelModal
        show={showCancelModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCancel}
        message={`Deseja realmente cancelar o agendamento do dia ${modalInfo.day} as ${modalInfo.hour}?`}
        title="Cancelar agendamento"
      />

      <Container>
        <UserAppointmentsSearch
          onInputChange={e => setCPF(e.target.value)}
          onInputFinished={handleSearchInputFinished}
          onSearchButtonClick={handleSearchButtonClick}
        />

        <Divider />

        <UserAppointmentsTable
          appointments={appointments}
          onCancelButtonClick={handleOpenCancelModal}
        />

        <UserAppointmentsFooter />
      </Container>
    </>
  );
};

export default UserAppointments;
