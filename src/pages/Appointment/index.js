import { useState } from 'react';
import ReactLoading from 'react-loading';
import { growl } from '@crystallize/react-growl';

import api from '../../services/api';
import LoadingIndicator from '../../components/LoadingIndicator';
import SuccessAppointmentModal from '../../components/SuccessAppointmentModal';
import {
  Container,
  Calendar,
  CPFInput,
  Input,
  FieldSetLabel,
  ScheduleCard,
  Recaptcha,
  Button,
  ScheduleLoadingContainer,
} from './styles';

const Appointment = () => {
  let captcha;

  let initialSchedule = [];
  const [schedule, setSchedule] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [modalInfo, setModalInfo] = useState({ day: '', hour: '' });
  const [docNumber, setDocNumber] = useState('');
  const [user, setUser] = useState({ cpf: '', phone: '', email: '', name: '' });
  const [CPFLoaded, setCPFLoaded] = useState(false);
  const [isVerified, setVerified] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingSchedule, setLoadingSchedule] = useState(false);

  function handleCloseModal() {
    setUser({ cpf: '', phone: '', email: '', name: '' });
    setSelectedDate('');
    setDocNumber('');
    setCPFLoaded(false);
    setVerified(false);
    setSchedule([]);
    document.getElementById('cpf-input').value = '';
    captcha.reset();
    setShowSuccessModal(false);
  }

  async function handleCreateAppointment() {
    if (!isVerified) {
      await growl({
        title: 'Verificação falhou',
        message: 'A verificação de segurança não foi assinalada',
        type: 'error',
      });
    } else {
      try {
        setLoading(true);
        const response = await api.post('/appointments', {
          ...user,
          date: selectedDate,
          docNumber,
        });

        setModalInfo({ day: response.data.date, hour: response.data.hour });
        setShowSuccessModal(true);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    }
  }

  function handleScheduleClick(s, idx) {
    const newSchedule = schedule.map((value, index) => ({
      ...value,
      selected: index === idx,
    }));
    setSchedule([...newSchedule]);
    setSelectedDate(new Date(s.value));
  }

  async function loadSchedule(date) {
    try {
      setLoadingSchedule(true);
      const response = await api.get('/available', {
        params: { date: Number(date) },
      });

      initialSchedule = response.data.map(sc => ({ ...sc, selected: false }));
      setSchedule([...initialSchedule]);
    } catch (err) {
      await growl({
        title: 'Erro',
        message: 'Ocorreu um erro ao buscar horário disponíveis',
        type: 'error',
      });
    } finally {
      setLoadingSchedule(false);
    }
  }

  async function handleCPFFinished(cpf) {
    try {
      setLoading(true);
      const response = await api.get(`/user/${cpf}`);
      setUser(response.data);
      setCPFLoaded(true);
    } catch (err) {
      await growl({
        title: 'Erro',
        message: 'Erro ao buscar dados do CPF',
        type: 'error',
      });
    } finally {
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
      return <p>Selecione um dia no calendário acima</p>;
    }

    return schedule.map((s, idx) => (
      <ScheduleCard
        isAvailable={s.available}
        isSelected={s.selected}
        onClick={() => handleScheduleClick(s, idx)}
      >
        <p>{s.time}</p>
        <p>{s.available ? 'Disponível' : 'Indisponível'}</p>
      </ScheduleCard>
    ));
  }

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <SuccessAppointmentModal
        day={modalInfo.day}
        hour={modalInfo.hour}
        handleClose={handleCloseModal}
        show={showSuccessModal}
      />

      <Container>
        <FieldSetLabel>1. Informe seus dados</FieldSetLabel>
        <fieldset>
          <legend>CPF</legend>
          <CPFInput
            id="cpf-input"
            CPFFinished={handleCPFFinished}
            onChange={e => setUser({ ...user, cpf: e.target.value })}
          />
        </fieldset>
        <fieldset>
          <legend>Nome completo</legend>
          <Input
            disabled={!CPFLoaded}
            onChange={e => setUser({ ...user, name: e.target.value })}
            value={user.name}
          />
        </fieldset>
        <fieldset>
          <legend>Telefone</legend>
          <Input
            disabled={!CPFLoaded}
            onChange={e => setUser({ ...user, phone: e.target.value })}
            value={user.phone}
          />
        </fieldset>
        <fieldset>
          <legend>E-mail</legend>
          <Input
            disabled={!CPFLoaded}
            onChange={e => setUser({ ...user, email: e.target.value })}
            value={user.email}
          />
        </fieldset>
        <fieldset>
          <legend>Número da guia ou pedido de certidão</legend>
          <Input
            onChange={e => setDocNumber(e.target.value)}
            value={docNumber}
          />
        </fieldset>
        <FieldSetLabel>
          2. Selecione o dia que você deseja retirar seu documento
        </FieldSetLabel>
        <fieldset>
          <Calendar
            activeStartDate={null}
            onClickDay={date => loadSchedule(date)}
          />
        </fieldset>
        <FieldSetLabel>3. Selecione um horário disponível</FieldSetLabel>
        <fieldset>{renderScheduleList()}</fieldset>
        <fieldset>
          <Recaptcha
            // eslint-disable-next-line no-return-assign
            ref={e => (captcha = e)}
            sitekey="6LcgnHEaAAAAAB1Ecw3Xe60xxkVHkYhoDE7upH1v"
            hl="pt-BR"
            type="explicit"
            verifyCallback={() => setVerified(true)}
            expiredCallback={() => setVerified(false)}
          />
          <Button onClick={handleCreateAppointment}>
            Realizar agendamento
          </Button>
        </fieldset>
      </Container>
    </>
  );
};

export default Appointment;
