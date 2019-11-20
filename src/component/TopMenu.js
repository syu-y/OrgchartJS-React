import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import NavBar from './NavBar';
import { useAuth0 } from "../react-auth0-spa";
import Profile from './Profile';

function TopMenu() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-center">
              {isAuthenticated && (
                <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
              )}
              {isAuthenticated && (
                <LinkContainer to="/chart">
                    <Nav.Link >Chart</Nav.Link>
                </LinkContainer>
              )}
              {isAuthenticated && (
                <LinkContainer to="">
                    <Nav.Link ><Profile /></Nav.Link>
                </LinkContainer>
              )}
          </Nav>


          {!isAuthenticated && (
            <Button onClick={() => loginWithRedirect({})}>Log in</Button>
          )}
          {isAuthenticated && <Button onClick={() => logout()}>Log out</Button>}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default TopMenu;
