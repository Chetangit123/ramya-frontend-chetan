import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import { GoogleOAuthProvider } from '@react-oauth/google';
const client_id = "631089970573-vvbs11s9ph94vgnrlar0e87o0p87cpma.apps.googleusercontent.com"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GoogleOAuthProvider clientId={client_id}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>



      </BrowserRouter>
    </GoogleOAuthProvider>
  </>
);

reportWebVitals();
