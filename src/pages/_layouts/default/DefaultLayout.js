import Header from './DefaultHeader';

import { Container, Main } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <>
      <Container>
        <Header />
        <Main>{children}</Main>
      </Container>
    </>
  );
}
