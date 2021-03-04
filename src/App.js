import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import GlobalStyles from './styles/global';

const App = () => (
  <BrowserRouter>
    <GlobalStyles />
    <Routes />
  </BrowserRouter>
);

export default App;
