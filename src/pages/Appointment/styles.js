import styled from 'styled-components';
import ReactCalendar from 'react-calendar';
import RecaptchaV2 from 'react-recaptcha';

import MyCPFInput from '../../components/CPFInput';
import { PrimaryButton } from '../../styles/button';

const Container = styled.div`
  width: 100%;
  height: 100vh - 160px;
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  h2 {
    margin-bottom: 10px;
    text-align: center;
  }

  fieldset {
    margin-left: 25px;
    max-width: 560px;
  }
`;

const Button = styled(PrimaryButton)`
  width: 100%;
  margin-top: 15px;
  z-index: -1;
`;

const Calendar = styled(ReactCalendar)`
  width: 100%;
  margin: 10px 20px 10px 0px;
`;

const Input = styled.input`
  width: 100%;
`;

const CPFInput = styled(MyCPFInput)`
  width: 100%;
`;

const FieldSetLabel = styled.p`
  font-weight: 500;
  margin-bottom: 10px;
  :not(:first-child) {
    margin-top: 40px;
  }
`;

const ScheduleCard = styled.div`
  display: inline-block;
  width: 120px;
  cursor: ${props => (props.isAvailable ? 'pointer' : 'default')};
  margin: 10px;
  padding: 10px 15px 10px 15px;
  border-radius: var(--default-border-radius);
  background-color: ${props => (props.isSelected ? '#A6A2A2' : '#FFFFFF')};
  color: ${props =>
    props.isAvailable ? 'var(--primary-font-color)' : '#d4d4d4'};

  p {
    text-align: center;
  }
`;

const Recaptcha = styled(RecaptchaV2)`
  float: right;
  margin: 30px 10px 0px 0px;
`;

const ScheduleLoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ErrorList = styled.ul`
  margin: 5px;
  margin-top: 30px;
  li {
    color: red;
  }
`;

const RadioFieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;

  p {
    margin-top: 5px;
  }

  label {
    display: flex;
    align-items: center;

    input {
      margin-right: 8px;
    }
  }
`;

const Footer = styled.footer`
  z-index: -1;
  transform: translateY(60px);

  @media (max-width: 660px) {
    transform: translateY(20px);
    margin-top: 40px;

    flex-direction: column;
    p:last-child {
      margin-top: 10px;
      margin-bottom: 30px;
    }
  }

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
    font-weight: 500;
    text-decoration: none;
    color: #000;
  }
`;

export {
  Container,
  Button,
  Calendar,
  Input,
  CPFInput,
  FieldSetLabel,
  ScheduleCard,
  Recaptcha,
  ScheduleLoadingContainer,
  ErrorList,
  RadioFieldSet,
  Footer,
};
