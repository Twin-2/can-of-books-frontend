import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// first time using a functional component
function LoginButton() {
  // object destructuring
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return !isAuthenticated && (
    <button onClick={loginWithRedirect}>Login</button>
  )
}

export default LoginButton;