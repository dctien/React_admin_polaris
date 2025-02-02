import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import reportWebVitals from './reportWebVitals';
import '@shopify/polaris/build/esm/styles.css';
import { AppProvider } from '@shopify/polaris';
import en from '@shopify/polaris/locales/en.json';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Suspense fallback={null}>
    <BrowserRouter>
      <AppProvider i18n={en}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AppProvider>
    </BrowserRouter>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
