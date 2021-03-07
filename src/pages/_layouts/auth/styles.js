import styled from 'styled-components';

const Container = styled.div`
  margin: -60px;
  display: grid;
  min-height: calc(100vh - 40px);
  height: 100%;
  grid-template-areas:
    'aside title'
    'aside main';
  grid-template-rows: 100px 1fr;
  grid-template-columns: 220px 1fr;

  @media (max-width: 660px) {
    margin: 0px;
  }
`;

const Menu = styled.ul`
  list-style: none;
  margin-top: 40px;
  height: 100%;
  width: 100%;

  /* Class for NavLink change color when menu button is selected */
  .active {
    color: #fff;
    background-color: var(--primary-color);
  }

  a {
    text-decoration: none;
    color: var(--primary-font-color);
    padding: 15px;
    border-radius: var(--default-border-radius);
  }

  a:hover {
    background-color: var(--primary-color);
  }
`;

const MenuItem = styled.li`
  padding: 15px;
  float: right;
  text-align: right;
`;

const AsideContainer = styled.aside`
  grid-area: aside;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #999794;
  padding-right: 4px;
  height: 100%;
`;

const Logo = styled.img`
  width: 100px;
  height: 124px;
  align-self: center;
`;

const Main = styled.main`
  grid-area: main;
  width: 100%;
`;

const TitleContainer = styled.header`
  grid-area: title;
  display: flex;
  margin: 40px 0px 10px 40px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

export {
  Menu,
  MenuItem,
  Container,
  Logo,
  AsideContainer,
  Main,
  TitleContainer,
  Title,
};
