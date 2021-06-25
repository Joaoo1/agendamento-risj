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
  font-size: 16px;
`;

const Footer = styled.footer`
  z-index: -1;
  font-weight: 500;
  position: absolute;
  bottom: 10px;
  width: 99%;
  display: flex;
  justify-content: space-between;

  p,
  a {
    font-size: 13px;
    display: inline-block;
  }

  p {
    margin: 0 5px;
  }

  a {
    text-decoration: none;
    color: #000;
  }
`;

export { Container, Button, Footer };
