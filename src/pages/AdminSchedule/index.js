import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { growl } from '@crystallize/react-growl';

import LoadingIndicator from '../../components/LoadingIndicator';
import CancelModal from '../../components/ConfirmModal';
import api from '../../services/api';
import {
  Container,
  Header,
  Button,
  ScheduleCard,
  ScheduleLoadingContainer,
  Modal,
  ModalMain,
} from './styles';

const AdminSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [isLoadingSchedule, setLoadingSchedule] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(false);
  const [showCreateScheduleModal, setShowCreateScheduleModal] = useState(false);

  async function fetchSchedule() {
    try {
      setLoadingSchedule(true);
      const response = await api.get('/schedule');
      setSchedule(response.data);
    } catch (err) {
      await growl({
        title: 'Erro',
        message: 'Erro ao buscar horários disponíveis',
        type: 'error',
      });
    } finally {
      setLoadingSchedule(false);
    }
  }

  useEffect(() => {
    fetchSchedule();
  }, []);

  async function handleScheduleClick(sc) {
    setSelectedSchedule(sc);
    setShowCancelModal(true);
  }

  async function handleCreateScheduleClick() {
    setShowCreateScheduleModal(true);
  }

  function handleCloseCancelModal() {
    setShowCancelModal(false);
    setSelectedSchedule('');
  }

  async function handleConfirmCancel() {
    try {
      setLoading(true);
      await api.delete(`/schedule/${selectedSchedule.id}`);
      fetchSchedule();
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
          message: 'Erro ao excluir horário1',
          type: 'error',
        });
      }
    } finally {
      handleCloseCancelModal();
      setLoading(false);
    }
  }

  async function handleCreateSchedule() {
    const { value } = document.getElementById('schedule');
    if (!value) {
      await growl({
        title: 'Erro',
        message: 'Insira um horário',
        type: 'error',
      });
      return;
    }
    try {
      setLoading(true);
      await api.post('/schedule', { schedule: value });
      await growl({
        title: 'Horário adicionado',
        message: 'O horário foi adicionado com sucesso',
        type: 'info',
      });
      fetchSchedule();
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
          message: 'Erro ao adicionar horário',
          type: 'error',
        });
      }
    } finally {
      setShowCreateScheduleModal(false);
      setLoading(false);
    }
  }

  function renderScheduleList() {
    if (isLoadingSchedule) {
      return (
        <ScheduleLoadingContainer>
          <ReactLoading type="spin" color="#403e3e" height={100} width={50} />
        </ScheduleLoadingContainer>
      );
    }
    if (schedule.length === 0) {
      return <p>Nenhum horário disponível foi encontrado</p>;
    }

    return schedule.map(s => (
      <ScheduleCard onClick={() => handleScheduleClick(s)}>
        <p>{s.schedule}</p>
      </ScheduleCard>
    ));
  }

  return (
    <>
      {isLoading && <LoadingIndicator />}

      {showCreateScheduleModal && (
        <Modal>
          <ModalMain>
            <h3>Adicionar horário</h3>
            <p>
              Digite o novo horário disponível no formato hh:mm (por exemplo,
              10:30).
            </p>
            <input id="schedule" type="text" />
            <Button onClick={handleCreateSchedule}>Adicionar</Button>
          </ModalMain>
        </Modal>
      )}
      <CancelModal
        show={showCancelModal}
        handleClose={handleCloseCancelModal}
        handleConfirm={handleConfirmCancel}
        message={`Deseja realmente excluir o horário "${selectedSchedule.schedule}" da lista de horários disponíveis?`}
        title="Excluir horário"
      />
      <Container>
        <Header>
          <p>Clique em um horário para retira-lo dos horários disponíveis.</p>
          <Button onClick={handleCreateScheduleClick}>Adicionar horário</Button>
        </Header>
        <fieldset>{renderScheduleList()}</fieldset>
      </Container>
    </>
  );
};

export default AdminSchedule;
