import { useHistory } from 'react-router-dom';

import { Container, Button } from './styles';

const Home = () => {
  const history = useHistory();

  function handleNavigateToAppointment() {
    history.push('/agendamento');
  }

  function handleNavigateToListAppointments() {
    history.push('/agendamentos_feitos');
  }
  return (
    <Container>
      <h2>Agendamento para retirada de documento</h2>
      <Button onClick={handleNavigateToAppointment}>Agendar um horário</Button>
      <Button onClick={handleNavigateToListAppointments}>
        Verificar agendamentos feitos
      </Button>
    </Container>
  );
};

export default Home;
