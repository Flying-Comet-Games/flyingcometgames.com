import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StytchProvider } from '@stytch/react';
import { StytchUIClient } from '@stytch/vanilla-js';

const stytch = new StytchUIClient('public-token-test-9e13324e-e7b0-4990-8d9c-84d8f21b31b3');

ReactDOM.render(
  <StytchProvider stytch={stytch}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StytchProvider>,
  document.getElementById('root')
);