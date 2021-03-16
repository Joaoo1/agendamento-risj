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
  HolidayCard,
  HolidayLoadingContainer,
  Modal,
  ModalMain,
} from './styles';

const AdminHolidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [isLoadingHolidays, setLoadingHolidays] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(false);
  const [showCreateHolidayModal, setShowCreateHolidayModal] = useState(false);

  async function fetchHolidays() {
    try {
      setLoadingHolidays(true);
      const response = await api.get('/holidays');
      setHolidays(response.data);
    } catch (err) {
      await growl({
        title: 'Erro',
        message: 'Erro ao buscar feriados',
        type: 'error',
      });
    } finally {
      setLoadingHolidays(false);
    }
  }

  useEffect(() => {
    fetchHolidays();
  }, []);

  async function handleHolidayClick(sc) {
    setSelectedHoliday(sc);
    setShowCancelModal(true);
  }

  async function handleCreateHolidayClick() {
    setShowCreateHolidayModal(true);
  }

  function handleCloseCancelModal() {
    setShowCancelModal(false);
    setSelectedHoliday('');
  }

  async function handleConfirmCancel() {
    try {
      setLoading(true);
      await api.delete(`/holiday/${selectedHoliday.id}`);
      await growl({
        title: 'Feriado excluído',
        message: 'Feriado excluído com sucesso',
        type: 'info',
      });
      fetchHolidays();
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
          message: 'Erro ao excluir feriado',
          type: 'error',
        });
      }
    } finally {
      handleCloseCancelModal();
      setLoading(false);
    }
  }

  async function handleCreateHoliday() {
    const { value } = document.getElementById('holiday');
    if (!value) {
      await growl({
        title: 'Erro',
        message: 'Insira uma data',
        type: 'error',
      });
      return;
    }
    try {
      setLoading(true);
      await api.post('/holiday', { date: value });
      await growl({
        title: 'Feriado adicionado',
        message: 'O Feriado foi adicionado com sucesso',
        type: 'info',
      });
      fetchHolidays();
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
          message: 'Erro ao adicionar feriado',
          type: 'error',
        });
      }
    } finally {
      setShowCreateHolidayModal(false);
      setLoading(false);
    }
  }

  function renderHolidaysList() {
    if (isLoadingHolidays) {
      return (
        <HolidayLoadingContainer>
          <ReactLoading type="spin" color="#403e3e" height={100} width={50} />
        </HolidayLoadingContainer>
      );
    }
    if (holidays.length === 0) {
      return <p>Nenhum feriado foi encontrado</p>;
    }

    return holidays.map(s => (
      <HolidayCard onClick={() => handleHolidayClick(s)}>
        <p>{s.date}</p>
      </HolidayCard>
    ));
  }

  return (
    <>
      {isLoading && <LoadingIndicator />}

      {showCreateHolidayModal && (
        <Modal>
          <ModalMain>
            <h3>Adicionar feriado</h3>
            <p>
              Digite qual a data do feriado no formato DD/MM/AAAA (por exemplo,
              01/01/2020).
            </p>
            <input id="holiday" type="text" />
            <Button onClick={handleCreateHoliday}>Adicionar</Button>
          </ModalMain>
        </Modal>
      )}
      <CancelModal
        show={showCancelModal}
        handleClose={handleCloseCancelModal}
        handleConfirm={handleConfirmCancel}
        message={`Deseja realmente excluir a data "${selectedHoliday.date}" da lista de feriados?`}
        title="Excluir feriado"
      />
      <Container>
        <Header>
          <p>Clique em uma data para retira-la da lista de feriados.</p>
          <Button onClick={handleCreateHolidayClick}>Adicionar feriado</Button>
        </Header>
        <fieldset>{renderHolidaysList()}</fieldset>
      </Container>
    </>
  );
};

export default AdminHolidays;
