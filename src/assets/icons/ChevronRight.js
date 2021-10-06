import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  description: PropTypes.string,
  className: PropTypes.string,
};

const defaultProps = {
  description: '',
  className: '',
};

const DoneIcon = ({ onClick, description, className }) => (
  <div title={description}>
    <svg
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  </div>
);

DoneIcon.propTypes = propTypes;
DoneIcon.defaultProps = defaultProps;

export default DoneIcon;
