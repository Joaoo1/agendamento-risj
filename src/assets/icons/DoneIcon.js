import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  description: PropTypes.string,
};

const defaultProps = {
  description: '',
};

const DoneIcon = ({ onClick, description }) => (
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
        d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
        fill="green"
      />
    </svg>
  </div>
);

DoneIcon.propTypes = propTypes;
DoneIcon.defaultProps = defaultProps;

export default DoneIcon;
