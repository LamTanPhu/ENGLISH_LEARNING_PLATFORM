import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/global.css';
import { AppRoutes } from './presentation/routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);