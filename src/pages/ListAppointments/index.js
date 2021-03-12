import { useState } from 'react';
import { growl } from '@crystallize/react-growl';

import api from '../../services/api';
import CancelModal from '../../components/ConfirmModal';
import LoadingIndicator from '../../components/LoadingIndicator';

import {
  Container,
  CPFInput,
  Button,
  SearchContainer,
  Divider,
  Table,
  CancelButton,
} from './styles';

const ListAppointments = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ day: '', hour: '' });
  const [appointments, setAppointments] = useState([]);
  const [CPF, setCPF] = useState('');
  const [isLoading, setLoading] = useState(false);

  function handleCloseModal() {
    setShowCancelModal(false);
  }

  function handleOpenModal(appointment) {
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
      await growl({
        title: 'Erro',
        message: 'Erro ao buscar agendamentos',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmCancel() {
    try {
      setLoading(true);
      await api.put(`/cancel_appointment/${modalInfo.id}`);
      searchAppointments();
      await growl({
        title: 'Sucesso',
        message: 'Agendamento cancelado com sucesso',
        type: 'info',
      });
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
          message: 'Ocorreu um erro ao cancelar agendamento',
          type: 'error',
        });
      }
    } finally {
      setModalInfo({ day: '', hour: '', id: '' });
      setLoading(false);
      handleCloseModal();
    }
  }

  async function handleSearchButtonClick() {
    if (CPF.length < 14) {
      await growl({
        title: 'Erro',
        message: 'CPF Inválido',
        type: 'error',
      });
      return;
    }

    searchAppointments();
  }

  function handleCPFFinished(cpf) {
    setCPF(cpf);
  }

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <CancelModal
        show={showCancelModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmCancel}
        message={`Deseja realmente cancelar o agendamento do dia ${modalInfo.day} as ${modalInfo.hour}?`}
        title="Cancelar agendamento"
      />

      <Container>
        <SearchContainer>
          <fieldset>
            <legend>Informe seu CPF</legend>
            <CPFInput
              onChange={e => setCPF(e.target.value)}
              CPFFinished={handleCPFFinished}
            />
          </fieldset>
          <Button onClick={handleSearchButtonClick}>Pesquisar</Button>
        </SearchContainer>

        <Divider />

        <Table>
          <thead>
            <tr>
              {window.innerWidth > 600 && <th>CPF</th>}
              <th>Dia</th>
              <th>Hora</th>
              <th colSpan="2">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(a => (
              <tr key={a.id}>
                {window.innerWidth > 600 && <td>{a.cpf}</td>}
                <td>{a.date}</td>
                <td>{a.hour}</td>
                <td>{a.status}</td>
                <td>
                  <CancelButton onClick={() => handleOpenModal(a)}>
                    Cancelar agendamento
                  </CancelButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ListAppointments;
