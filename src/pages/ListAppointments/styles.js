import styled from 'styled-components';

import MyCPFInput from '../../components/CPFInput';
import { PrimaryButton } from '../../styles/button';

const Container = styled.div`
  height: 100vh - 160px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;

  h2 {
    margin-bottom: 10px;
    text-align: center;
  }

  fieldset {
    width: 100%;
    margin-left: 25px;
    max-width: 500px;
  }
`;

const Button = styled(PrimaryButton)`
  align-self: flex-end;
  margin-left: 15px;
  width: 100%;
  max-width: 200px;
`;

const CPFInput = styled(MyCPFInput)`
  width: 100%;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Divider = styled.div`
  content: '';
  margin-top: 20px;
  width: 90%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    transparent 0%,
    #a9a9ac 25%,
    #a9a9ac 75%,
    transparent 100%
  );
`;

const Table = styled.table`
  border-spacing: 0px 5px;
  width: 70%;
  margin-top: 30px;

  @media (max-width: 840px) {
    width: 90%;
  }

  thead {
    background-color: #a4a4a4;
  }

  tr {
    background-color: rgba(116, 121, 122, 0.15);
  }

  th,
  td {
    text-align: start;
    padding: 10px;
  }

  tr:first-child,
  th:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  tr:last-child,
  th:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .more-icon {
    float: right;

    :hover {
      opacity: 0.8;
      background-color: #bfbfbf;
      transition: opacity 0.2s;
    }
  }
`;

export { Container, Button, CPFInput, SearchContainer, Divider, Table };
