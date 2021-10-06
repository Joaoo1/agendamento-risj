import styled from 'styled-components';

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-start;

  > div {
    cursor: pointer;
  }

  @media (max-width: 640px) {
    justify-content: center;
  }
`;

const Container = styled.div``;

const Main = styled.main`
  display: flex;
  justify-content: center;
`;

export { Header, Container, Main };
