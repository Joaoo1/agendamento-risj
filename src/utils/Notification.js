import { growl as Notification } from '@crystallize/react-growl';

const showErrorNotification = async ({
  err,
  defaultMessage = '',
  title = 'Erro',
}) => {
  const message =
    err && err.response ? err.response.data.error : defaultMessage;

  await Notification({
    title,
    message,
    type: 'error',
  });
};

const showSuccessNotification = async ({ message, title }) => {
  await Notification({
    title,
    message,
    type: 'info',
  });
};

export { showErrorNotification, showSuccessNotification };
