import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';

import App from './App';

import './index.scss';
import 'normalize.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <>
    <ToastContainer theme="colored" position="bottom-right" />
    <App />
  </>,
  document.getElementById('root'),
);
