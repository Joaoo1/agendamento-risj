import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root{
    --height-input: 46px;
    --primary-font-color: rgba(0,0,0,0.8);
    --primary-color: #C5C7C8;
    --body-margin: 80px;
  }

  *{
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
  }

  body {
    background-image: linear-gradient(180deg, #FFFFFF 0%, #C5C7C8 90%);
    font: normal 15px 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    color: var(--primary-font-color);
    margin: var(--body-margin);
    height: calc(100vh - (var(--body-margin) * 2));
  }
  input {
    font: 300 15px 'Poppins', sans-serif;
    border: 1px solid #EEEEEF !important;
    padding-left: 20px;
    height: var(--height-input);
  }

  button:hover {
    opacity: 0.8;
    -moz-box-shadow:    inset 0 0 7px #0000002c;
    -webkit-box-shadow: inset 0 0 7px #0000002c;
    box-shadow:         inset 0 0 12px #0000002c;
  }
`;
