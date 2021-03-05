import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root{
    --height-input: 46px;
    --primary-font-color: rgba(0,0,0,0.8);
    --primary-color: #C5C7C8;
    --body-margin: 80px;
    --default-border-radius: 10px;
  }

  *{
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
  }

  html {
    min-height: 100% !important;
  }

  body {
    background-image: linear-gradient(180deg, #FFFFFF 0%, #C5C7C8 80%);
    background-repeat: no-repeat;
    font: 400 15px 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    color: var(--primary-font-color);
    margin: var(--body-margin);

    @media(max-width: 660px) {
      margin: 20px;
    }
    
  }
  input {
    border: 1px solid #adadad !important;
    padding-left: 20px;
    height: var(--height-input);
    border-radius: var(--default-border-radius);
  }

  input:disabled {
  background: #f0efed;
}

  button:hover {
    opacity: 0.8;
    -moz-box-shadow:    inset 0 0 7px #0000002c;
    -webkit-box-shadow: inset 0 0 7px #0000002c;
    box-shadow:         inset 0 0 12px #0000002c;
  }
  
  fieldset {
    border: none;
  }

  .react-calendar {
    border-radius: var(--default-border-radius);
  }

  input, button, legend, p, .react-calendar__navigation__label__labelText, .react-calendar {
    font: 400 15px 'Poppins', sans-serif;
  }
`;
