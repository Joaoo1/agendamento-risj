import PropTypes from 'prop-types';

import { TitleContainer, Title } from './styles';

const propTypes = {
  title: PropTypes.string,
};

const defaultProps = {
  title: '',
};

const AuthHeader = ({ title }) => (
  <TitleContainer>
    <Title>{title}</Title>
  </TitleContainer>
);

AuthHeader.propTypes = propTypes;
AuthHeader.defaultProps = defaultProps;

export default AuthHeader;
