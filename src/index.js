import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Auth0Provider} from '@auth0/auth0-react';


// TODO: wrap everything in Auth0
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
