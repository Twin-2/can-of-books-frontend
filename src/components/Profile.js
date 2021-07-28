import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'

class Profile extends React.Component {
  componentDidMount() {
    console.log(this.props.auth0.isAuthenticated);
    if(this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
      .then(res => {
        console.log(res);
        const jwt = res.__raw;

        const config = {
          method: 'get',
          headers: {'Authorization': `Bearer ${jwt}`},
          baseURL: 'https://can-of-books-dw.herokuapp.com',
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
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={user.picture} />
          <Card.Body>
            <Card.Title> Hello {user.name}!</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Email: {user.email}</ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    )
  }
}


export default withAuth0(Profile);
