import Aside from './DefaultAside';
import Title from './DefaultHeader';

import { Container, Main } from './styles';

const DefaultLayout = ({ children, title }) => (
  <>
    <Container>
      <Title title={title} />
      <Aside />
      <Main>{children}</Main>
    </Container>
  </>
);

export default DefaultLayout;
