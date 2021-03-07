import styled from 'styled-components';

const BaseButton = styled.button`
  border: none;
  border-radius: calc(var(--default-border-radius) + 7px);
  font: 400 15px 'Poppins', sans-serif;
  height: var(--input-height);
  color: white;
`;

const PrimaryButton = styled(BaseButton)`
  background-color: #758186;
`;

export { BaseButton, PrimaryButton };
