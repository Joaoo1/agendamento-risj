import { useState } from 'react';
import { growl } from '@crystallize/react-growl';

import api from '../../services/api';
import CancelModal from '../../components/CancelModal';
import LoadingIndicator from '../../components/LoadingIndicator';

import {
  Container,
  CPFInput,
  Button,
  SearchContainer,
  Divider,
  Table,
} from './styles';
import CancelIcon from '../../assets/icons/CancelIcon';

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
      day: appointment.day,
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

  async function handleConfirmCancel(id) {
    try {
      setLoading(true);
      await api.put(`/user_appointments/${id}`);
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
        hour={modalInfo.hour}
        day={modalInfo.day}
        appointmentId={modalInfo.id}
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
              <th>CPF</th>
              <th>Dia</th>
              <th>Hora</th>
              <th colSpan="2">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(a => (
              <tr key={a.id}>
                <td>{a.cpf}</td>
                <td>{a.date}</td>
                <td>{a.hour}</td>
                <td>{a.status}</td>
                <td>
                  <CancelIcon onClick={() => handleOpenModal(a)} />
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
