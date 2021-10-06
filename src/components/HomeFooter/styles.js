import styled from 'styled-components';

const Footer = styled.footer`
  z-index: -1;
  font-weight: 500;
  position: absolute;
  bottom: 10px;
  width: 99%;
  display: flex;
  justify-content: space-between;

  a {
    font-size: 13px;
    display: inline-block;
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
