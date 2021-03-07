import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 12px;
  height: calc(var(--input-height) + 4px);
`;

const Logo = styled.img`
  width: 250px;
  margin-bottom: 30px;
`;

const PasswordContainer = styled.div`
  display: flex;
  width: 100%;

  input {
    height: calc(var(--input-height) + 4px);
  }

  .icon {
    margin: 11px 8px 0 -40px;
  }
`;

const Error = styled.p`
  color: red;
`;

export { Container, FormContainer, Input, Logo, PasswordContainer, Error };
