import ReactDOM from 'react-dom';
import Notifications from 'react-notify-toast';

import App from './App';

import './index.scss';
import 'normalize.css';

ReactDOM.render(
  <>
    <Notifications options={{ top: 56 }} />
    <App />
  </>,
  document.getElementById('root'),
);
