import styled from 'styled-components';

import BaseTable from '../../styles/table';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 40px 40px 40px;

  h2 {
    margin-bottom: 10px;
    text-align: center;
  }
`;

const AppointmentsTable = styled(BaseTable)`
  width: 100%;

  .icons {
    display: flex;
    float: right;
  }

  .icons svg {
    margin-right: 10px;
  }
`;

const ScheduleLoadingContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const ServicesList = styled.ul`
  list-style: none;

  li {
    margin-top: 4px;
  }
`;

export { Container, AppointmentsTable, ScheduleLoadingContainer, ServicesList };
