import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 40px 40px 40px;

  > div {
    width: 100%;
  }

  h2 {
    margin-bottom: 10px;
    text-align: center;
  }
`;

const ScheduleLoadingContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

export { Container, ScheduleLoadingContainer };
