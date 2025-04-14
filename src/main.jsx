import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { AppContainer } from './components/App/AppContainer.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
