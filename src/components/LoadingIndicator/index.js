import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

import { LoadingContainer } from './styles';

const propTypes = {
  color: PropTypes.string,
};

const defaultProps = {
  color: '403e3e',
};

const LoadingIndicator = ({ color }) => (
  <LoadingContainer>
    <ReactLoading
      type="spinningBubbles"
      height={250}
      width={125}
      color={color}
    />
  </LoadingContainer>
);

LoadingIndicator.propTypes = propTypes;
LoadingIndicator.defaultProps = defaultProps;

export default LoadingIndicator;
