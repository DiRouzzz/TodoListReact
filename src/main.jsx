import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { AppContainer } from './AppContainer.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </StrictMode>
);
