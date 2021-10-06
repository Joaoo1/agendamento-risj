import styled from 'styled-components';

import { PrimaryButton } from '../../../styles/button';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 40px 40px 40px;

  h2 {
    text-align: center;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Button = styled(PrimaryButton)`
  max-width: 300px;
  width: 100%;
`;

const ScheduleCard = styled.div`
  display: inline-block;
  background-color: #fff;
  width: 120px;
  cursor: pointer;
  margin: 10px;
  padding: 15px;
  border-radius: var(--default-border-radius);
  color: var(--primary-font-color);

  p {
    text-align: center;
  }

  :hover {
    opacity: 0.8;
    background-color: #a6a2a2;
  }
`;

const ScheduleLoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export { Container, Header, Button, ScheduleCard, ScheduleLoadingContainer };
