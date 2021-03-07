import Header from './DefaultHeader';

import { Container, Main } from './styles';

const DefaultLayout = ({ children }) => (
  <>
    <Container>
      <Header />
      <Main>{children}</Main>
    </Container>
  </>
);

export default DefaultLayout;
