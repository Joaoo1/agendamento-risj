import { useState, useEffect } from 'react';

import LoadingIndicator from '../../../components/LoadingIndicator';
import DeleteModal from '../../../components/ConfirmModal';
import AddScheduleModal from '../../../components/AddScheduleModal';
import api from '../../../services/api';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../../utils/Notification';
import ScheduleList from '../../../components/ScheduleList';

import { Container, Header, Button } from './styles';

const AdminSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [isLoadingSchedule, setLoadingSchedule] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(false);
  const [showCreateScheduleModal, setShowCreateScheduleModal] = useState(false);

  async function fetchSchedule() {
    try {
      setLoadingSchedule(true);
      const response = await api.get('/schedule');
      setSchedule(response.data);
    } catch (err) {
      showErrorNotification({
        err,
        defaultMessage: 'Erro ao buscar horários disponíveis',
      });
    } finally {
      setLoadingSchedule(false);
    }
  }

  useEffect(() => {
    fetchSchedule();
  }, []);

  async function handleScheduleCardClick(sc) {
    setSelectedSchedule(sc);
    setShowDeleteModal(true);
  }

  async function handleCreateScheduleClick() {
    setShowCreateScheduleModal(true);
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false);
    setSelectedSchedule('');
  }

  async function deleteModal() {
    try {
      setLoading(true);
      await api.delete(`/schedule/${selectedSchedule.id}`);
      showSuccessNotification({
        title: 'Horário excluído',
        message: 'Horário excluído com sucesso',
      });
      fetchSchedule();
    } catch (err) {
      showErrorNotification({ err, defaultMessage: 'Erro ao excluir horário' });
    } finally {
      handleCloseDeleteModal();
      setLoading(false);
    }
  }

  async function handleConfirmDeleteModal() {
    deleteModal();
  }

  function handleCreateSchedule() {
    setShowCreateScheduleModal(false);
    fetchSchedule();
  }

  return (
    <>
      {isLoading && <LoadingIndicator />}

      <AddScheduleModal
        show={showCreateScheduleModal}
        onCreateSchedule={handleCreateSchedule}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteModal}
        message={`Deseja realmente excluir o horário "${selectedSchedule.schedule}" da lista de horários disponíveis?`}
        title="Excluir horário"
      />

      <Container>
        <Header>
          <p>Clique em um horário para retira-lo dos horários disponíveis.</p>
          <Button onClick={handleCreateScheduleClick}>Adicionar horário</Button>
        </Header>
        <fieldset>
          <ScheduleList
            isLoading={isLoadingSchedule}
            onCardClick={handleScheduleCardClick}
            schedule={schedule}
          />
        </fieldset>
      </Container>
    </>
  );
};

export default AdminSchedule;
