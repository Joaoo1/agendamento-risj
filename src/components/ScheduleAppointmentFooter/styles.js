import styled from 'styled-components';

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

  a {
    font-size: 13px;
    display: inline-block;
    font-weight: 500;
    text-decoration: none;
    color: #000;
  }
`;

const Text = styled.p`
  margin: 0 5px;
  font-size: 13px;
  display: inline-block;
`;

export { Footer, Text };
