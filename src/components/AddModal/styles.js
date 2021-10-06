import styled from 'styled-components';

import { PrimaryButton } from '../../styles/button';

const Button = styled(PrimaryButton)`
  max-width: 300px;
  width: 100%;
`;

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
  padding: 20px;
  display: flex;
  flex-direction: column;

  input {
    width: 100%;
  }

  p {
    margin: 10px 0 15px 0;
  }

  button {
    align-self: flex-end;
    margin-top: 20px;
    max-width: 150px;
  }
`;

export { Button, Modal, ModalMain };
