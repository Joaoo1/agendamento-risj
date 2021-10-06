import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

import { LoadingContainer } from './styles';

const propTypes = {
  color: PropTypes.string,
};

const defaultProps = {
  color: '#403e3e',
};

const TableLoading = ({ color }) => (
  <LoadingContainer>
    <ReactLoading type="spin" color={color} height={100} width={50} />
  </LoadingContainer>
);

TableLoading.propTypes = propTypes;
TableLoading.defaultProps = defaultProps;

export default TableLoading;
