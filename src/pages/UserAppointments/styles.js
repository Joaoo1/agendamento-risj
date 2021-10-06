import styled from 'styled-components';

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

export { Container, Divider };
