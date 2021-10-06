import styled from 'styled-components';

import { PrimaryButton } from '../../../styles/button';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 40px 40px 40px;

  h2 {
    text-align: center;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Button = styled(PrimaryButton)`
  max-width: 300px;
  width: 100%;
`;

export { Container, Header, Button };
