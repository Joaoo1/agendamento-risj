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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalMain = styled.section`
  position: fixed;
  background: white;
  width: 80%;
  max-width: 500px;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--default-border-radius);
`;

export {
  Container,
  AppointmentsTable,
  ScheduleLoadingContainer,
  Modal,
  ModalMain,
};
