// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';
// import 'normalize.css';
// import { Provider } from 'react-redux';
// import store from './_store/store.js';
// import { HelmetProvider } from 'react-helmet-async';

// // msw
// if (import.meta.env.DEV) {
//   const { worker } = await import('./mocks/browser');
//   worker.start();
// }

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <HelmetProvider>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </HelmetProvider>
// );

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { AuthProvider } from './contexts/AuthContext';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './_store/store';
// import { HelmetProvider } from 'react-helmet-async';

// // MSW 설정 함수
// async function startWorker() {
//   if (import.meta.env.DEV) {
//     const { worker } = await import('./mocks/browser');
//     worker.start();
//   }
// }

// startWorker();

// ReactDOM.render(
//   <HelmetProvider>
//     <Provider store={store}>
//       <BrowserRouter>
//         <AuthProvider>
//           <App />
//         </AuthProvider>
//       </BrowserRouter>
//     </Provider>
//   </HelmetProvider>,
//   document.getElementById('root')
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'normalize.css';
import { Provider } from 'react-redux';
import store from './_store/store';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// MSW 설정 함수
async function startWorker() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    worker.start();
  }
}

startWorker();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);


