import { BrowserRouter } from 'react-router-dom';
import { GrowlScene } from '@crystallize/react-growl';
import Routes from './routes';

import GlobalStyles from './styles/global';
import 'react-calendar/dist/Calendar.css';

const App = () => (
  <BrowserRouter>
    <GlobalStyles />
    <GrowlScene />
    <Routes />
  </BrowserRouter>
);

export default App;
