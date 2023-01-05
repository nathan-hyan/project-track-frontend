import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import App from './App';

import './index.scss';
import 'normalize.css';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <>
    <ToastContainer theme="colored" position="bottom-right" />
    <App />
  </>,
);
