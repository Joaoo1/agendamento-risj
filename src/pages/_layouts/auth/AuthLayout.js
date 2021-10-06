import PropTypes from 'prop-types';

import Aside from './AuthAside';
import Title from './AuthHeader';

import { Container, Main } from './styles';

const propTypes = {
  title: PropTypes.string,
};

const defaultProps = {
  title: '',
};

const AuthLayout = ({ children, title }) => (
  <>
    <Container>
      <Title title={title} />
      <Aside />
      <Main>{children}</Main>
    </Container>
  </>
);

AuthLayout.propTypes = propTypes;
AuthLayout.defaultProps = defaultProps;

export default AuthLayout;
