import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { login as doLogin, isAuthenticated } from '../../services/auth';
import LoadingIndicator from '../../components/LoadingIndicator';
import LogoImg from '../../assets/images/logo-with-name.png';
import ChevronRight from '../../assets/icons/ChevronRight';
import api from '../../services/api';

import {
  Container,
  FormContainer,
  Input,
  Logo,
  PasswordContainer,
  Error,
} from './styles';

const AdminLogin = () => {
  const history = useHistory();

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/admin/appointments');
    }
  }, []);

  async function signIn() {
    try {
      setLoading(true);
      const response = await api.post('/admin_session', { login, password });
      doLogin(response.data);
      history.push('/admin/appointments');
    } catch (err) {
      if (err.response) {
        setError('Houve um problema com o login, verifique suas credenciais.');
      } else {
        setError('Houve um problema no servidor.');
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSignInButtonClick() {
    signIn();
  }

  async function handlePasswordKeyPress(e) {
    if (e.keyCode === 13) {
      signIn();
    }
  }

  function handleLoginInputChange(e) {
    setLogin(e.target.value);
  }

  function handlePasswordInputChange(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <Container>
        <FormContainer>
          <Logo src={LogoImg} />
          <Input
            type="email"
            placeholder="Login"
            onChange={handleLoginInputChange}
            value={login}
          />
          <PasswordContainer>
            <Input
              type="password"
              placeholder="Senha"
              onKeyDown={handlePasswordKeyPress}
              onChange={handlePasswordInputChange}
              value={password}
            />
            <ChevronRight
              onClick={handleSignInButtonClick}
              size={26}
              className="icon"
              color="#5a5c5a"
            />
          </PasswordContainer>
          {error && <Error>{error}</Error>}
        </FormContainer>
      </Container>
    </>
  );
};

export default AdminLogin;
