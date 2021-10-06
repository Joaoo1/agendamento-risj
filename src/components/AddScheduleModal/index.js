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
  onCreateSchedule: PropTypes.func.isRequired,
};

const AddScheduleModal = ({ show, onCreateSchedule }) => {
  const [isLoading, setLoading] = useState(false);

  async function createSchedule() {
    const { value } = document.getElementById('schedule');
    if (!value) {
      showErrorNotification({ defaultMessage: 'Insira um horário' });
      return;
    }
    try {
      setLoading(true);
      await api.post('/schedule', { schedule: value });
      showSuccessNotification({
        title: 'Horário adicionado',
        message: 'O horário foi adicionado com sucesso',
      });
    } catch (err) {
      showErrorNotification({
        err,
        defaultMessage: 'Erro ao adicionar horário',
      });
    } finally {
      setLoading(false);
      onCreateSchedule();
    }
  }

  async function handleCreateButtonClick() {
    const { value } = document.getElementById('schedule');
    if (!value) {
      showErrorNotification({
        defaultMessage: 'Insira uma data',
      });
    }

    createSchedule(value);
  }

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {show && (
        <AddModal
          title="Adicionar horário"
          text=" Digite o novo horário disponível no formato hh:mm (por exemplo,
                  10:30)."
          onButtonClick={handleCreateButtonClick}
          inputId="schedule"
        />
      )}
    </>
  );
};

AddScheduleModal.propTypes = propTypes;

export default AddScheduleModal;
