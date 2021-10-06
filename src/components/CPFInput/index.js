import { useCallback } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  CPFFinished: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
};

const defaultProps = {
  id: '',
  className: '',
};

const CPFInput = ({ CPFFinished, onChange, id, className }) => {
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

  return (
    <input
      className={className}
      id={id}
      maxLength={11}
      onChange={onChange}
      onKeyUp={handleKeyUp}
    />
  );
};

CPFInput.propTypes = propTypes;
CPFInput.defaultProps = defaultProps;

export default CPFInput;
