import styled from 'styled-components';

import { PrimaryButton } from '../../styles/button';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalMain = styled.section`
  position: fixed;
  background: white;
  width: 80%;
  max-width: 800px;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--default-border-radius);
  display: flex;
  flex-direction: column;
  padding: 30px;

  @media (max-width: 600px) {
    padding: 15px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font: 400 26px 'Poppins', sans-serif;
  color: var(--primary-font-color);
  width: 100%;
  text-align: center;
`;

const Button = styled(PrimaryButton)`
  align-self: flex-end;
  min-width: 150px;
  margin-top: 20px;
`;

const Content = styled.div`
  p {
    margin-bottom: 10px;
  }

  .red-text {
    color: red;
  }
`;

export { Modal, ModalMain, Title, Button, Header, Content };
