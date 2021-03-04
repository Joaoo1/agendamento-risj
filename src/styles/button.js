import styled from 'styled-components';

const BaseButton = styled.button`
  border: none;
  border-radius: 15px;
  font: 400 15px 'Poppins', sans-serif;
  height: var(--height-input);
  color: white;
`;

const PrimaryButton = styled(BaseButton)`
  background-color: #787474;
`;

const WarningButton = styled(BaseButton)`
  background-color: #ff2424;
`;

export { BaseButton, PrimaryButton, WarningButton };
