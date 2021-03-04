import { Header } from './styles';

import logoImg from '../../../assets/images/logo-with-name.png';

const DefaultHeader = () => (
  <Header>
    <img src={logoImg} alt="Logomarca do Registro de Imóveis de São José" />
  </Header>
);

export default DefaultHeader;
