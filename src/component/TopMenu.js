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
            {/* <Nav.Link href="/">Home</Nav.Link> */}
            {/* <Nav.Link href="/chart">Chart</Nav.Link> */}
            <LinkContainer to="/">
              {/* <Button>Home</Button> */}
              <Nav.Link >Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/chart">
              <Nav.Link >Chart</Nav.Link>
              {/* <Button>Chart</Button> */}
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
