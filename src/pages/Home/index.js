import { useHistory } from 'react-router-dom';

import HomeFooter from '../../components/HomeFooter';

import { Container, Button } from './styles';

const Home = () => {
  const history = useHistory();

  function handleScheduleAppointmentButtonClick() {
    history.push('/agendar');
  }

  function handleUserAppointmentsButtonClick() {
    history.push('/agendamentos');
  }

  return (
    <Container>
      <h2>Agendamento de atendimento</h2>
      <Button onClick={handleScheduleAppointmentButtonClick}>
        Agendar um horário
      </Button>
      <Button onClick={handleUserAppointmentsButtonClick}>
        Verificar agendamentos feitos
      </Button>
      <HomeFooter />
    </Container>
  );
};

export default Home;
