import { useEffect, useState } from 'react';

import Paginate from '../../../components/Paginate';
import ConcludedAppointmentsTable from '../../../components/ConcludedAppointmentsTable';
import { showErrorNotification } from '../../../utils/Notification';
import api from '../../../services/api';

import { Container } from './styles';

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
      showErrorNotification({
        err,
        defaultMessage: 'Erro ao buscar agendamentos',
      });
    } finally {
      setLoadingAppointments(false);
    }
  }

  async function fetchTotalPages() {
    try {
      const response = await api.get('/count_concluded_appointments');
      setTotalPages(response.data.pages);
    } catch (err) {
      showErrorNotification({
        err,
        defaultMessage: 'Erro ao buscar total de páginas',
      });
    } finally {
      setLoadingAppointments(false);
    }
  }

  useEffect(() => {
    fetchAppointments();
    fetchTotalPages();
  }, []);

  function handlePageClick(page) {
    fetchAppointments(page);
  }

  return (
    <Container>
      <ConcludedAppointmentsTable
        appointments={appointments}
        isLoading={isLoadingAppointments}
      />
      <Paginate onPageClick={handlePageClick} pages={totalPages} />
    </Container>
  );
};

export default AdminConcludeAppointments;
