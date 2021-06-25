import styled from 'styled-components';

import BaseTable from '../../styles/table';
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

const Table = styled(BaseTable)`
  width: 70%;
  margin: 30px 10px 30px 10px;

  @media (max-width: 840px) {
    width: 90%;
  }
`;

const CancelButton = styled.button`
  border: 1px solid #ff0000;
  border-radius: 25px;
  background-color: transparent;
  color: red;
  padding: 2px 10px 2px 10px;
  float: right;
  font-size: 13px;
`;

const Footer = styled.footer`
  z-index: -1;
  font-weight: 500;
  position: absolute;
  bottom: 10px;
  width: 99%;
  display: flex;
  justify-content: space-between;

  p,
  a {
    font-size: 13px;
    display: inline-block;
  }

  p {
    margin: 0 5px;
  }

  a {
    text-decoration: none;
    color: #000;
  }
`;

export {
  Container,
  Button,
  CPFInput,
  SearchContainer,
  Divider,
  Table,
  CancelButton,
  Footer,
};
