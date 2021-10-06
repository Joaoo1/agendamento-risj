import { NavLink } from 'react-router-dom';

import { logout, getAdminUserName } from '../../../services/auth';
import LogoImg from '../../../assets/images/logo.png';

import { Menu, MenuItem, AsideContainer, Logo, UserName } from './styles';

const AuthAside = () => {
  function handleLogoutClick() {
    logout();
  }

  return (
    <AsideContainer>
      <Logo src={LogoImg} alt="Logomarca do Registro de imóveis de São José" />
      <UserName>{getAdminUserName()}</UserName>
      <Menu>
        <MenuItem>
          <NavLink to="/admin/appointments">Agendamentos</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/admin/conclude-appointments">Agend. concluídos</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/admin/canceled-appointments">Agend. cancelados</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/admin/schedule">Horários disponíveis</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/admin/holidays">Feriados</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink onClick={handleLogoutClick} to="/admin" exact>
            Sair do sistema
          </NavLink>
        </MenuItem>
      </Menu>
    </AsideContainer>
  );
};
export default AuthAside;
