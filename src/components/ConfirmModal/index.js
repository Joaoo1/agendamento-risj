import PropTypes from 'prop-types';

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

const propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  confirmButtonColor: PropTypes.string,
};

const defaultProps = {
  confirmButtonColor: '#ff2424',
};

const ConfirmModal = ({
  show,
  onClose,
  onConfirm,
  message,
  title,
  confirmButtonColor,
}) =>
  show && (
    <Modal>
      <ModalMain>
        <Title>{title}</Title>
        <Divider />
        <Text>{message}</Text>
        <Divider />
        <ButtonsContainer>
          <CancelButton onClick={onClose}>Cancelar</CancelButton>
          <ConfirmButton
            backgroundColor={confirmButtonColor}
            onClick={onConfirm}
          >
            Confirmar
          </ConfirmButton>
        </ButtonsContainer>
      </ModalMain>
    </Modal>
  );

ConfirmModal.propTypes = propTypes;
ConfirmModal.defaultProps = defaultProps;

export default ConfirmModal;
