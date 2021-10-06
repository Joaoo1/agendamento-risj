import { useState, useEffect } from 'react';

import LoadingIndicator from '../../../components/LoadingIndicator';
import DeleteModal from '../../../components/ConfirmModal';
import api from '../../../services/api';
import HolidayList from '../../../components/HolidayList';
import AddHolidayModal from '../../../components/AddHolidayModal';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../../utils/Notification';

import { Container, Header, Button } from './styles';

const AdminHolidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [isLoadingHolidays, setLoadingHolidays] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(false);
  const [showCreateHolidayModal, setShowCreateHolidayModal] = useState(false);

  async function fetchHolidays() {
    try {
      setLoadingHolidays(true);
      const response = await api.get('/holidays');
      setHolidays(response.data);
    } catch (err) {
      showErrorNotification({ err, defaultMessage: 'Erro ao buscar feriados' });
    } finally {
      setLoadingHolidays(false);
    }
  }

  useEffect(() => {
    fetchHolidays();
  }, []);

  function handleHolidayCardClick(holiday) {
    setSelectedHoliday(holiday);
    setShowDeleteModal(true);
  }

  function handleCreateHolidayClick() {
    setShowCreateHolidayModal(true);
  }

  function handleCreateHoliday() {
    setShowCreateHolidayModal(false);
    fetchHolidays();
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false);
    setSelectedHoliday('');
  }

  async function deleteHoliday() {
    try {
      setLoading(true);
      await api.delete(`/holiday/${selectedHoliday.id}`);
      showSuccessNotification({
        title: 'Feriado excluído',
        message: 'Feriado excluído com sucesso',
      });
      fetchHolidays();
    } catch (err) {
      showErrorNotification({ err, defaultMessage: 'Erro ao excluir feriado' });
    } finally {
      handleCloseDeleteModal();
      setLoading(false);
    }
  }

  function handleConfirmDeleteModal() {
    deleteHoliday();
  }

  return (
    <>
      {isLoading && <LoadingIndicator />}

      <AddHolidayModal
        show={showCreateHolidayModal}
        onCreateHoliday={handleCreateHoliday}
      />
      <DeleteModal
        show={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteModal}
        message={`Deseja realmente excluir a data "${selectedHoliday.date}" da lista de feriados?`}
        title="Excluir feriado"
      />
      <Container>
        <Header>
          <p>Clique em uma data para retira-la da lista de feriados.</p>
          <Button onClick={handleCreateHolidayClick}>Adicionar feriado</Button>
        </Header>
        <HolidayList
          holidays={holidays}
          isLoading={isLoadingHolidays}
          onCardClick={handleHolidayCardClick}
        />
      </Container>
    </>
  );
};

export default AdminHolidays;
