import styled from 'styled-components';

import MyCPFInput from '../CPFInput';
import { PrimaryButton } from '../../styles/button';

const CPFInput = styled(MyCPFInput)`
  width: 100%;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Button = styled(PrimaryButton)`
  align-self: flex-end;
  margin-left: 15px;
  width: 100%;
  max-width: 200px;
`;

export { CPFInput, SearchContainer, Button };
