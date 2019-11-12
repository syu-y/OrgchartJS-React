import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

function TopMenu() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-center">
            <LinkContainer to="/">
              <Button>Home</Button>
            </LinkContainer>
            <LinkContainer to="/chart">
              <Button>Chart</Button>
            </LinkContainer>
            {/* <Nav.Link href="/">Home</Nav.Link> */}
            {/* <Nav.Link href="#chart">Chart</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default TopMenu;
