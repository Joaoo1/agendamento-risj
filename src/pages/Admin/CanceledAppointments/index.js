import { useEffect, useState } from 'react';

import CanceledAppointmentsTable from '../../../components/CanceledAppointmentsTable';
import Paginate from '../../../components/Paginate';
import { showErrorNotification } from '../../../utils/Notification';
import api from '../../../services/api';

import { Container } from './styles';

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
      const response = await api.get('/count_canceled_appointments');
      setTotalPages(response.data.pages);
    } catch (err) {
      showErrorNotification({
        err,
        defaultMessage: 'Erro ao buscar total de páginas',
      });
    }
  }

  useEffect(() => {
    fetchTotalPages();
    fetchAppointments();
  }, []);

  function handlePageClick(page) {
    fetchAppointments(page);
  }

  return (
    <>
      <Container>
        <CanceledAppointmentsTable
          appointments={appointments}
          isLoading={isLoadingAppointments}
        />
        <Paginate pages={totalPages} onPageClick={handlePageClick} />
      </Container>
    </>
  );
};

export default AdminCanceledAppointments;
