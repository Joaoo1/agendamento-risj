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

const CancelModal = ({
  show,
  handleClose,
  handleConfirm,
  day,
  hour,
  appointmentId,
}) =>
  show ? (
    <Modal>
      <ModalMain>
        <Title>Cancelar agendamento</Title>
        <Divider />
        <Text>
          {`Deseja realmente cancelar o agendamento do dia ${day} as ${hour} horas?`}
        </Text>
        <Divider />
        <ButtonsContainer>
          <CancelButton onClick={handleClose}>Cancelar</CancelButton>
          <ConfirmButton onClick={() => handleConfirm(appointmentId)}>
            Confirmar
          </ConfirmButton>
        </ButtonsContainer>
      </ModalMain>
    </Modal>
  ) : (
    <></>
  );
export default CancelModal;
