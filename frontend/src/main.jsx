import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import * as serviceWorker from './serviceWorker';
import App from './App';
import { store } from './store';

// style + assets
import './assets/scss/style.scss';
import config from './config';
import './assets/css/style.css';

// ==============================|| REACT DOM RENDER  ||============================== //

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={config.basename}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

serviceWorker.unregister();