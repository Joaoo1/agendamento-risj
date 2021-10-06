import PropTypes from 'prop-types';

import { Button, Modal, ModalMain } from './styles';

const propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  inputId: PropTypes.func.isRequired,
};

const AddModal = ({ title, text, onButtonClick, inputId }) => (
  <Modal>
    <ModalMain>
      <h3>{title}</h3>
      <p>{text}</p>
      <input id={inputId} type="text" />
      <Button onClick={onButtonClick}>Adicionar</Button>
    </ModalMain>
  </Modal>
);

AddModal.propTypes = propTypes;

export default AddModal;
