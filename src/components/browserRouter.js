import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {withAuth0} from '@auth0/auth0-react';

class BroswerRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/">
          {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
          {!this.props.auth0.iaAuthenticated && 
            <Login />}
          {this.props.auth0.iaAuthenticated && 
            <Bookshelf />}
        </Route>
        {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
        <Route path='/profile'>
          <Profile />
        </Route>
      </Switch>
    )
  }
}

export default withAuth0(BrowserRouter);
