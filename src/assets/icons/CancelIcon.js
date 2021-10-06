import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  description: PropTypes.string,
};

const defaultProps = {
  description: '',
};

const CancelIcon = ({ onClick, description }) => (
  <div title={description}>
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        fill="red"
      />
    </svg>
  </div>
);

CancelIcon.propTypes = propTypes;
CancelIcon.defaultProps = defaultProps;

export default CancelIcon;
