import PropTypes from 'prop-types';

import { Button, SearchContainer, CPFInput } from './styles';

const propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onInputFinished: PropTypes.func.isRequired,
  onSearchButtonClick: PropTypes.func.isRequired,
};

const UserAppointmentsSearch = ({
  onInputChange,
  onInputFinished,
  onSearchButtonClick,
}) => (
  <SearchContainer>
    <fieldset>
      <legend>Informe seu CPF</legend>
      <CPFInput onChange={onInputChange} CPFFinished={onInputFinished} />
    </fieldset>
    <Button onClick={onSearchButtonClick}>Pesquisar</Button>
  </SearchContainer>
);

UserAppointmentsSearch.propTypes = propTypes;

export default UserAppointmentsSearch;
