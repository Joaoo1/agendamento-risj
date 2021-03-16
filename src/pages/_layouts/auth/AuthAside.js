import { NavLink } from 'react-router-dom';

import { logout, getAdminUserName } from '../../../services/auth';
import LogoImg from '../../../assets/images/logo.png';

import { Menu, MenuItem, AsideContainer, Logo, UserName } from './styles';

const AuthAside = () => (
  <AsideContainer>
    <Logo src={LogoImg} alt="Logomarca do Registro de imóveis de São José" />
    <UserName>{getAdminUserName()}</UserName>
    <Menu>
      <MenuItem>
        <NavLink to="/admin_appointments">Agendamentos</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/admin_conclude">Agend. concluídos</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/admin_canceled">Agend. cancelados</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/admin_available">Horários disponíveis</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/admin_holidays">Feriados</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink onClick={() => logout()} to="/admin">
          Sair do sistema
        </NavLink>
      </MenuItem>
    </Menu>
  </AsideContainer>
);

export default AuthAside;
