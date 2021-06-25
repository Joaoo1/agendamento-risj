import { useHistory } from 'react-router-dom';

import { Container, Button, Footer } from './styles';

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
      <h2>Agendamento de atendimento</h2>
      <Button onClick={handleNavigateToAppointment}>Agendar um horário</Button>
      <Button onClick={handleNavigateToListAppointments}>
        Verificar agendamentos feitos
      </Button>
      <Footer>
        <p>
          Registro de imóveis de São José © 2021 - Todos os Direitos Reservados{' '}
        </p>
        <p>
          Desenvolvido por{' '}
          <a href="https://github.com/Joaoo1">João Vitor da Silva</a>
        </p>
      </Footer>
    </Container>
  );
};

export default Home;
