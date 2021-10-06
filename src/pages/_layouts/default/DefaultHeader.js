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
      <div role="presentation" onClick={handleImgClick}>
        <img src={logoImg} alt="Logomarca do Registro de Imóveis de São José" />
      </div>
    </Header>
  );
};

export default DefaultHeader;
