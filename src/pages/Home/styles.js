import styled from 'styled-components';
import { PrimaryButton } from '../../styles/button';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 700px;

  h2 {
    margin-bottom: 10px;
    text-align: center;
  }
`;

const Button = styled(PrimaryButton)`
  width: 100%;
  margin-top: 15px;
  height: 56px;
`;

export { Container, Button };
