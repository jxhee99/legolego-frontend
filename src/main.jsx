import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'normalize.css';
import { Provider } from 'react-redux';
import store from './_store/store.js';
import { HelmetProvider } from 'react-helmet-async';

// msw
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser');
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </HelmetProvider>
);
