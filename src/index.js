import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Auth0Provider} from '@auth0/auth0-react';


// TODO: wrap everything in Auth0
ReactDOM.render(
  <Auth0Provider domain="" clientId="" redirectUri="http://localhost:3000">
    <App />
  </Auth0Provider>, document.getElementById('root')
  );
