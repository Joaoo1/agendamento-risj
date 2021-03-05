import styled from 'styled-components';

import { BaseButton, WarningButton } from '../../styles/button';

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
  max-width: 500px;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--default-border-radius);
`;

const Title = styled.h2`
  font: 400 24px 'Poppins', sans-serif;
  color: var(--primary-font-color);
  margin: 25px 0px 10px 25px;
`;

const Text = styled.p`
  font: 400 15px 'Poppins', sans-serif;
  color: var(--primary-font-color);
  margin: 10px 25px 10px 25px;
`;

const Divider = styled.hr`
  opacity: 0.8;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ConfirmButton = styled(WarningButton)`
  padding: 5px 30px 5px 30px;
  margin: 20px 20px 20px 0px;
`;

const CancelButton = styled(BaseButton)`
  background-color: #c4c4c4;
  padding: 5px 30px 5px 30px;
  margin: 20px;
`;

export {
  Modal,
  ModalMain,
  Divider,
  Title,
  ButtonsContainer,
  CancelButton,
  ConfirmButton,
  Text,
};
