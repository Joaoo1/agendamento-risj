import Aside from './AuthAside';
import Title from './AuthHeader';

import { Container, Main } from './styles';

const AuthLayout = ({ children, title }) => (
  <>
    <Container>
      <Title title={title} />
      <Aside />
      <Main>{children}</Main>
    </Container>
  </>
);

export default AuthLayout;
