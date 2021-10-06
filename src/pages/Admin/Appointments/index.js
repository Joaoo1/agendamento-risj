import { useEffect, useState } from 'react';

import ConfirmModal from '../../../components/ConfirmModal';
import LoadingIndicator from '../../../components/LoadingIndicator';
import AppointmentsTable from '../../../components/AppointmentsTable';
import api from '../../../services/api';

import { Container } from './styles';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../../utils/Notification';

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
      showErrorNotification({
        err,
        defaultMessage: 'Erro ao buscar agendamentos',
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

  async function handleConcludeAppointmentButtonClick(a) {
    setSelectedAppointment(a);
    setShowConcludeModal(true);
  }

  async function handleCancelAppointmentButtonClick(a) {
    setSelectedAppointment(a);
    setShowCancelModal(true);
  }

  async function cancelAppointment() {
    try {
      setLoading(true);
      await api.put(`/admin_cancel_appointment/${selectedAppointment.id}`);
      showSuccessNotification({
        title: 'Agendamento cancelado',
        message: 'O agendamento foi cancelado com sucesso',
      });
      fetchAppointments();
    } catch (err) {
      showErrorNotification({
        err,
        defaultMessage: 'Erro ao cancelar agendamento',
      });
    } finally {
      handleCloseCancelModal();
      setLoading(false);
    }
  }

  async function handleCancelModalConfirm() {
    cancelAppointment();
  }

  async function concludeAppointment() {
    try {
      setLoading(true);
      await api.put(`/conclude_appointment/${selectedAppointment.id}`);
      showSuccessNotification({
        title: 'Agendamento concluído',
        message: 'O agendamento foi concluído com sucesso',
      });
      fetchAppointments();
    } catch (err) {
      showErrorNotification({
        err,
        defaultMessage: 'Erro ao alterar agendamento',
      });
    } finally {
      handleCloseConcludeModal();
      setLoading(false);
    }
  }

  async function handleConcludeModalConfirm() {
    concludeAppointment();
  }

  return (
    <>
      {isLoading && <LoadingIndicator />}

      <ConfirmModal
        show={showConcludeModal}
        onClose={handleCloseConcludeModal}
        onConfirm={handleConcludeModalConfirm}
        message={`O agendamento do dia ${selectedAppointment.date} as ${selectedAppointment.hour} será concluído.`}
        title="Concluir agendamento"
        confirmButtonColor="#6cb1c4"
      />

      <ConfirmModal
        show={showCancelModal}
        onClose={handleCloseCancelModal}
        onConfirm={handleCancelModalConfirm}
        message={`Deseja realmente cancelar o agendamento do dia ${selectedAppointment.date} ás ${selectedAppointment.hour}?`}
        title="Cancelar agendamento"
      />

      <Container>
        <AppointmentsTable
          appointments={appointments}
          onCancel={handleCancelAppointmentButtonClick}
          onDone={handleConcludeAppointmentButtonClick}
          isLoading={isLoadingAppointments}
        />
      </Container>
    </>
  );
};

export default AdminAppointments;
