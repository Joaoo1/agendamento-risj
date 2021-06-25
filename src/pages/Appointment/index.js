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
  ErrorList,
  RadioFieldSet,
  Footer,
} from './styles';

const Appointment = () => {
  let captcha;

  let initialSchedule = [];
  const [schedule, setSchedule] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalInfo, setModalInfo] = useState({ day: '', hour: '' });
  const [docNumber, setDocNumber] = useState('');
  const [user, setUser] = useState({ cpf: '', phone: '', email: '', name: '' });
  const [CPFLoaded, setCPFLoaded] = useState(false);
  const [isVerified, setVerified] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingSchedule, setLoadingSchedule] = useState(false);
  const [formErrors, setFormErrors] = useState(false);

  // Handle success create appointment modal close
  function handleCloseModal() {
    // Reset all form
    setUser({ cpf: '', phone: '', email: '', name: '' });
    setSelectedDate('');
    setDocNumber('');
    setCPFLoaded(false);
    setVerified(false);
    setSchedule([]);
    document.getElementById('cpf-input').value = '';
    captcha.reset();
    setFormErrors(null);
    setShowSuccessModal(false);
    const checkboxes = document.getElementsByName('service-type');
    checkboxes.forEach(r => {
      r.checked = false;
    });
  }

  async function handleCreateAppointment() {
    // Check if reCAPTCHA is checked
    if (!isVerified) {
      await growl({
        title: 'Verificação falhou',
        message: 'A verificação de segurança não foi assinalada',
        type: 'error',
      });

      return;
    }

    try {
      setLoading(true);
      const ap = { ...user };
      if (selectedDate) ap.date = selectedDate;
      const services = [];
      const checkboxes = document.getElementsByName('service-type');
      checkboxes.forEach(cb => {
        if (cb.checked) {
          services.push(cb.value);
        }
      });
      ap.docNumber = docNumber;
      if (services.length > 0) ap.services = services;
      const response = await api.post('/appointments', ap);

      setModalInfo({ day: response.data.date, hour: response.data.hour });
      setShowSuccessModal(true);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errors) {
          setFormErrors(err.response.data.errors);
        } else {
          await growl({
            title: 'Erro',
            message: err.response.data.error,
            type: 'error',
          });
        }
      } else {
        await growl({
          title: 'Erro',
          message: 'Ocorreu um erro ao cadastrar agendamento',
          type: 'error',
        });
      }
    } finally {
      setLoading(false);
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

  // Get CPF info when the user finishes typing
  async function handleCPFFinished(cpf) {
    try {
      setLoading(true);
      const response = await api.get(`/user/${cpf}`);
      const { name, phone, email } = response.data;
      setUser({
        cpf,
        name: name || user.name,
        phone: phone || user.phone,
        email: email || user.email,
      });
      setCPFLoaded(true);
    } catch (err) {
      await growl({
        title: 'Erro',
        message: err.error,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

  // Function to allow just numbers for phone input
  function handleChangePhoneInput(e) {
    const re = /^[0-9\b]+$/;

    if (e.target.value === '' || re.test(e.target.value)) {
      setUser({ ...user, phone: e.target.value });
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
          <legend>Telefone com DDD</legend>
          <Input
            disabled={!CPFLoaded}
            onChange={handleChangePhoneInput}
            value={user.phone}
            maxLength={11}
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
        <FieldSetLabel>
          2. Selecione quais tipos de atendimento você precisa
        </FieldSetLabel>
        <RadioFieldSet>
          <label htmlFor="certificate-request">
            <input
              type="checkbox"
              id="certificate-request"
              name="service-type"
              value="Realizar pedido de certidão"
            />
            Realizar pedido de certidão
          </label>
          <label htmlFor="withdraw-certificate">
            <input
              type="checkbox"
              id="withdraw-certificate"
              name="service-type"
              value="Retirada de pedido de certidão concluído"
            />
            Retirada de pedido de certidão concluído
          </label>
          <label htmlFor="checkin-guia">
            <input
              type="checkbox"
              id="checkin-guia"
              name="service-type"
              value="Entrada de guia"
            />
            Entrada de guia
          </label>
          <label htmlFor="checkout-guia">
            <input
              type="checkbox"
              id="checkout-guia"
              name="service-type"
              value="Retirada de guia pronta"
            />
            Retirada de guia pronta
          </label>
          <label htmlFor="checkout-requirements">
            <input
              type="checkbox"
              id="checkout-requirements"
              name="service-type"
              value="Retirada de exigências"
            />
            Retirada de exigências
          </label>
          <label htmlFor="return-requirements">
            <input
              type="checkbox"
              id="return-requirements"
              name="service-type"
              value="Retorno de exigências"
            />
            Retorno de exigências
          </label>

          <p>Número da(s) guia(s) e/ou pedido(s) de certidão.</p>
          <Input
            onChange={e => setDocNumber(e.target.value)}
            value={docNumber}
          />
        </RadioFieldSet>
        <FieldSetLabel>
          3. Selecione o dia que você deseja agendar seu atendimento
        </FieldSetLabel>
        <fieldset>
          <Calendar
            activeStartDate={null}
            onClickDay={date => loadSchedule(date)}
          />
        </fieldset>
        <FieldSetLabel>4. Selecione um horário disponível</FieldSetLabel>
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
          {formErrors && (
            <ErrorList>
              {formErrors.map(e => (
                <li>{e}</li>
              ))}
            </ErrorList>
          )}
          <Button onClick={handleCreateAppointment}>
            Realizar agendamento
          </Button>
        </fieldset>

        <Footer>
          <p>
            Registro de imóveis de São José © 2021 - Todos os Direitos
            Reservados{' '}
          </p>
          <p>
            Desenvolvido por{' '}
            <a href="https://github.com/Joaoo1">João Vitor da Silva</a>
          </p>
        </Footer>
      </Container>
    </>
  );
};

export default Appointment;
