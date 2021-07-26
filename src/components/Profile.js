import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends React.Component {
  componentDidMount() {
    if(this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
      .then(res => {
        const jwt = res.__raw;

        const config = {
          method: 'get',
          headers: {'Authorization': `Bearer ${jwt}`},
          baseURL: 'http://localhost:3001',
          url: '/auth-test' // Probably going to have to change this
        }

        axios(config)
          .then(results => console.log('came from my /auth-test route on the backend', results))
          .catch(err => console.error(err))
      });
    }
  }
  
  render() {
    const { user } = this.props.auth0;
    return (
      <div>
        Hello {user.name}!
        <img src={user.picture} />
        Email: {user.email}
      </div>
    )
  }
}

export default withAuth0(Profile);