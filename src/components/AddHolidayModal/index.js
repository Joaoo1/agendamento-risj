import { useState } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';
import LoadingIndicator from '../LoadingIndicator';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/Notification';
import AddModal from '../AddModal';

const propTypes = {
  show: PropTypes.bool.isRequired,
  onCreateHoliday: PropTypes.func.isRequired,
};

const AddHolidayModal = ({ show, onCreateHoliday }) => {
  const [isLoading, setLoading] = useState(false);

  async function createHoliday(value) {
    try {
      setLoading(true);
      await api.post('/holiday', { date: value });
      showSuccessNotification({
        title: 'Feriado adicionado',
        message: 'O Feriado foi adicionado com sucesso',
      });
    } catch (err) {
      showErrorNotification({
        err,
        defaultMessage: 'Erro ao adicionar feriado',
      });
    } finally {
      setLoading(false);
      onCreateHoliday();
    }
  }

  async function handleCreateButtonClick() {
    const { value } = document.getElementById('holiday');
    if (!value) {
      showErrorNotification({
        defaultMessage: 'Insira uma data',
      });
    }

    createHoliday(value);
  }

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {show && (
        <AddModal
          title="Adicionar feriado"
          text="Digite qual a data do feriado no formato DD/MM/AAAA (por exemplo,
          01/01/2020)."
          onButtonClick={handleCreateButtonClick}
          inputId="holiday"
        />
      )}
    </>
  );
};

AddHolidayModal.propTypes = propTypes;

export default AddHolidayModal;
