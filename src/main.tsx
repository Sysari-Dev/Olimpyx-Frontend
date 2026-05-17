import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './core/store';
import './assets/styles/toast-custom.css';
import './index.css';
import App from './App';

import { polyfill } from 'mobile-drag-drop';
import 'mobile-drag-drop/default.css';

polyfill();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);