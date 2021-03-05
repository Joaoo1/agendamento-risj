/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useHistory } from 'react-router-dom';

import logoImg from '../../../assets/images/logo-with-name.png';
import { Header } from './styles';

const DefaultHeader = () => {
  const history = useHistory();

  function handleImgClick() {
    history.push('/');
  }
  return (
    <Header>
      <img
        onClick={handleImgClick}
        src={logoImg}
        alt="Logomarca do Registro de Imóveis de São José"
      />
    </Header>
  );
};

export default DefaultHeader;
