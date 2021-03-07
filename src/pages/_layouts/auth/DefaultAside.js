import { NavLink } from 'react-router-dom';

import { logout } from '../../../services/auth';
import LogoImg from '../../../assets/images/logo.png';

import { Menu, MenuItem, AsideContainer, Logo } from './styles';

const DefaultAside = () => (
  <AsideContainer>
    <Logo src={LogoImg} alt="Logomarca do Registro de imóveis de São José" />
    <Menu>
      <MenuItem>
        <NavLink to="/admin_appointments">Agendamentos</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/admin_available">Horários disponíveis</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/admin_canceled">Agend. cancelados</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink onClick={() => logout()} to="/admin">
          Sair do sistema
        </NavLink>
      </MenuItem>
    </Menu>
  </AsideContainer>
);

export default DefaultAside;
