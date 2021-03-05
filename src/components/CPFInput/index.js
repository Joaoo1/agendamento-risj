import { useCallback } from 'react';

const CPFInput = ({ CPFFinished, ...props }) => {
  const handleKeyUp = useCallback(e => {
    let { value } = e.currentTarget;
    // Only accept number
    value = value.replace(/\D/g, '');

    // Format number to CPF format
    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    e.currentTarget.value = value;

    if (value.length === 14 && CPFFinished) {
      CPFFinished(value);
    }
  }, []);

  return <input maxLength={11} {...props} onKeyUp={handleKeyUp} />;
};

export default CPFInput;
