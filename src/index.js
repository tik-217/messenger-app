// react
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";

// style
import './index.css';

// components
import App from './components/App.js';

// auth
import { Auth0Provider } from "@auth0/auth0-react";

// redux
import { store } from "./store/store.ts";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-rv5oqgxohb74xz6c.us.auth0.com"
      clientId="2bbhMXdKe1LWXil8tSdyC9PrNPKsNILE"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </Provider>
);