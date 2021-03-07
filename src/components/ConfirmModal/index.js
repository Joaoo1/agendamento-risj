import {
  Modal,
  ModalMain,
  Divider,
  Title,
  ButtonsContainer,
  CancelButton,
  ConfirmButton,
  Text,
} from './styles';

const ConfirmModal = ({
  show,
  handleClose,
  handleConfirm,
  message,
  title,
  confirmButtonColor = '#ff2424',
}) =>
  show ? (
    <Modal>
      <ModalMain>
        <Title>{title}</Title>
        <Divider />
        <Text>{message}</Text>
        <Divider />
        <ButtonsContainer>
          <CancelButton onClick={handleClose}>Cancelar</CancelButton>
          <ConfirmButton
            backgroundColor={confirmButtonColor}
            onClick={handleConfirm}
          >
            Confirmar
          </ConfirmButton>
        </ButtonsContainer>
      </ModalMain>
    </Modal>
  ) : (
    <></>
  );
export default ConfirmModal;
